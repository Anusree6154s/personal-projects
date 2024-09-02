
const {
  mockValidationResult,
  mockCryptoServiceResult,
  mockSanitzedUserResult,
  mockReqBody,
  reqMock,
  resMock,
  mockjwtToken
} = require('../../mocks/auth.mock');

const httpStatus = require('http-status');
const { createUser, loginUser, logoutUser, checkAuth, sendOTP, resetPassword } = require('../../../src/controller/auth.controller');
const { apiUtil, validationUtil, sanitizeUtil } = require('../../../src/utils');
const { User } = require('../../../src/model/user.model');
const { cryptoService, authService } = require('../../../src/services');
const jwt = require("jsonwebtoken");

jest.useFakeTimers()
//doesnt require the server or mongoose to work because we are mocking those functions

describe('Auth Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = reqMock;
    res = { ...resMock };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('createUser', () => {

    beforeEach(() => {
      validationUtil.validate.mockReturnValue(mockValidationResult);
      cryptoService.crytpoSignup.mockReturnValue(mockCryptoServiceResult)
      sanitizeUtil.sanitizeUser.mockReturnValue(mockSanitzedUserResult)
      jwt.sign.mockReturnValue(mockjwtToken)
    });

    test('should validate the request body', async () => {
      await createUser(req, res, next);

      expect(validationUtil.validate).toHaveBeenCalledWith(
        mockReqBody,
        validationUtil.validateSignup
      );
    });

    test('should throw an error if validation fails', async () => {
      validationUtil.validate.mockImplementation(() => {
        throw new apiUtil.ApiError(httpStatus.BAD_REQUEST, 'Invalid input');
      });

      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
      expect(next.mock.calls[0][0]).toMatchObject({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Invalid input'
      });
    });

    test('should call cryptoService.crytpoSignup with the correct arguments', async () => {
      await createUser(req, res, next);

      expect(cryptoService.crytpoSignup).toHaveBeenCalledWith(req.body);
    });

    test('should generate a JWT token and set test as a cookie', async () => {
      await createUser(req, res, next);

      expect(jwt.sign).toHaveBeenCalledWith(mockSanitzedUserResult, process.env.SECRET_KEY);
      const cookie = res.cookies['jwt'];
      expect(cookie).toEqual({
        value: mockjwtToken,
        options: {
          httpOnly: true,
          expires: expect.any(Date),
        }
      });
    });

    test('should return the sanitized user data in the response', async () => {
      await createUser(req, res, next);

      expect(res.statusCode).toBe(httpStatus.CREATED);
      expect(res.jsonData).toEqual(mockSanitzedUserResult);
    });
  });

  describe("loginUser", () => {
    test("should set a cookie with the JWT token and return user info", async () => {
      await loginUser(req, res, next);

      const cookie = res.cookies['jwt'];
      expect(cookie).toEqual({
        value: mockjwtToken,
        options: {
          httpOnly: true,
          expires: expect.any(Date),
        }
      });
      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.jsonData).toEqual(req.user.info);
    });
  });

  describe('logoutUser', () => {
    test('should clear the JWT cookie and return id as null', async () => {
      await logoutUser(req, res, next);

      const cookie = res.cookies['jwt'];
      expect(cookie).toEqual({
        value: '',
        options: {
          httpOnly: true,
          expires: new Date(0),
        }
      });

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.jsonData).toEqual({ id: null });
    });
  });

  describe('checkAuth', () => {
    test('should return user info if req.user is defined', async () => {
      await checkAuth(req, res, next);

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.jsonData).toEqual(req.user);
    });

    test('should throw an UNAUTHORIZED error if req.user is not defined', async () => {
      req.user = undefined; // No user data

      await checkAuth(req, res, next);

      // check errors
      expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
      expect(next.mock.calls[0][0]).toMatchObject({
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Check Failed'
      });

      // ensure res has not been called
      expect(res.statusCode).toBe(null);
      expect(res.jsonData).toBe(null);
    });
  });

  describe('sendOTP', () => {
    beforeEach(() => {
      req = { ...reqMock, body: { ...reqMock.body, OTP: '123456' } };
      res = { ...resMock };
      next = jest.fn();
    });

    test('should send OTP successfully if email exists', async () => {
      const mockUserFindResult = { id: '123456' }
      User.findOne.mockReturnValue(mockUserFindResult);
      authService.sendEmail.mockReturnValue()

      await sendOTP(req, res, next);

      await jest.runAllTimersAsync();
      
      // check if methods are called properly
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(authService.sendEmail).toHaveBeenCalledWith(req.body.email, req.body.OTP, mockUserFindResult.id);

      // Check if status and send response are correct
      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.jsonData.message).toBe('OTP sent successfully');
    });

    test('should throw a NOT_FOUND error if email does not exist', async () => {
      User.findOne.mockReturnValue(); // Mock User.find to return an empty array

      await sendOTP(req, res, next);

      await jest.runAllTimersAsync();

      expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
      expect(next.mock.calls[0][0]).toMatchObject({
        statusCode: httpStatus.NOT_FOUND,
        message: "Email doesn't exist"
      });

      // Ensure that no response is sent
      expect(res.statusCode).toBe(null);
      expect(res.jsonData).toBe(null);
    });
  });

  describe('resetPassword', () => {
    beforeEach(()=>{
      req.params = { id: '123' }
      validationUtil.validate.mockReturnValue(mockValidationResult);
      cryptoService.crytpoReset.mockReturnValue();
    })

    test('should reset the password successfully when validation passes', async () => {
      await resetPassword(req, res, next);

      expect(validationUtil.validate).toHaveBeenCalledWith({ password: req.body.password }, validationUtil.validateReset);
      expect(cryptoService.crytpoReset).toHaveBeenCalledWith(req.params.id, req.body.password);

      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.jsonData.message).toBe('Password has been reset');
    });

    test('should throw an error if password validation fails', async () => {
      validationUtil.validate.mockImplementation(() => {
        throw new apiUtil.ApiError(httpStatus.BAD_REQUEST, 'Invalid password');
      });

      await resetPassword(req, res, next);

      const error = next.mock.calls[0][0]
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Invalid password');

      // Ensure that cryptoReset and response methods are not called
      expect(cryptoService.crytpoReset).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    test('should throw an error if crytpoReset fails', async () => {
      cryptoService.crytpoReset.mockImplementation(() => {
        throw new Error('Failed to reset password');
      });

      await resetPassword(req, res, next);

      const error = next.mock.calls[0][0]
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Failed to reset password');

      // Ensure that the response methods are not called
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
