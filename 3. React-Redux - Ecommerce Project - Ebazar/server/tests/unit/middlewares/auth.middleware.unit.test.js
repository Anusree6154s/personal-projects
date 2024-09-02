const httpStatus = require("http-status");
const { apiUtil } = require("../../../src/utils");
const {  isAuthLocal, isAuthJwt } = require("../../../src/middlewares/auth.middleware");
const { mockRequest, mockResponse, mockNext } = require('../../mocks/middlware.mock');
const passport = require('passport');

jest.mock('passport');
jest.useFakeTimers()

describe('Auth Middleware', () => {
    afterEach(() => {
        jest.clearAllTimers();
    })

    describe('isAuthJwt', () => {

        test('should call next() with user if authentication is successful', async () => {
            // Mock request, response, and next
            const req = mockRequest();
            const res = mockResponse();
            const next = mockNext();
        
            // Mock the passport.authenticate to call callback with a user
            const mockUser = { id: 'userId123', name: 'John Doe' };
            passport.authenticate.mockImplementation((strategy, callback) => {
                return (req, res, next) => {
                    callback(null, mockUser); // Simulate successful authentication
                };
            });
        
            // Call the isAuthJwt middleware
            await isAuthJwt(req, res, next);
        
            // Assertions
            expect(req.user).toBe(mockUser); // Ensure user is attached to req
            expect(next).toHaveBeenCalled(); // Ensure next was called
            expect(next).toHaveBeenCalledWith(); // Ensure next was called without arguments
        });

        test('should call next() with an error if authentication fails', async () => {
            // Mock request, response, and next
            const req = mockRequest();
            const res = mockResponse();
            const next = mockNext();
        
            // Mock the passport.authenticate to call callback with error
            const mockError = new Error('Authentication error');
            passport.authenticate.mockImplementation((strategy, callback) => {
                return (req, res, next) => {
                    callback(mockError, null); // Simulate authentication failure with error
                };
            });
        
            // Call the isAuthJwt middleware
            await isAuthJwt(req, res, next);
        
            // Assertions
            expect(next).toHaveBeenCalledWith(new apiUtil.ApiError(httpStatus.UNAUTHORIZED, 'Authentication Failed')); // Ensure next was called with ApiError
            expect(req.user).toBeUndefined(); // Ensure req.user is not set
        });
        

    });

    describe('isAuthLocal', () => {
        test('should call next() with user if authentication is successful', async () => {
            // Mock request, response, and next
            const req = mockRequest();
            const res = mockResponse();
            const next = mockNext();
        
            // Mock the passport.authenticate to call callback with a user
            const mockUser = { id: 'userId123', name: 'John Doe' };
            passport.authenticate.mockImplementation((strategy, callback) => {
                return (req, res, next) => {
                    callback(null, mockUser); // Simulate successful authentication
                };
            });
        
            // Call the isAuthLocal middleware
            await isAuthLocal(req, res, next);
        
            // Assertions
            expect(req.user).toBe(mockUser); // Ensure user is attached to req
            expect(next).toHaveBeenCalled(); // Ensure next was called
            expect(next).toHaveBeenCalledWith(); // Ensure next was called without arguments
        });

        test('should return 400 if credentials are missing', async () => {
            // Mock request, response, and next
            const req = mockRequest();
            const res = mockResponse();
            const next = mockNext();
        
            // Mock the passport.authenticate to call callback with info message "Missing credentials"
            passport.authenticate.mockImplementation((strategy, callback) => {
                return (req, res, next) => {
                    callback(null, null, { message: 'Missing credentials' }); // Simulate missing credentials
                };
            });
        
            // Call the isAuthLocal middleware
            await isAuthLocal(req, res, next);
        
            // Assertions
            expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith("Missing email or password");
            expect(next).not.toHaveBeenCalled(); // Ensure next was not called
        });

        test('should return 401 if email or password is incorrect', async () => {
            // Mock request, response, and next
            const req = mockRequest();
            const res = mockResponse();
            const next = mockNext();
        
            // Mock the passport.authenticate to call callback with info message "Invalid credentials"
            passport.authenticate.mockImplementation((strategy, callback) => {
                return (req, res, next) => {
                    callback(null, null, { message: 'Invalid credentials' }); // Simulate invalid credentials
                };
            });
        
            // Call the isAuthLocal middleware
            await isAuthLocal(req, res, next);
        
            // Assertions
            expect(res.status).toHaveBeenCalledWith(httpStatus.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith("Email or password is incorrect.");
            expect(next).not.toHaveBeenCalled(); // Ensure next was not called
        });
        
    });
})