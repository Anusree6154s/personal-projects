const { verifyJwt, verifyLocal } = require('../../../src/services/controller.services/passport.service');
const { User } = require('../../../src/model/user.model');
const { cryptoService } = require('../../../src/services');
const { sanitizeUtil } = require('../../../src/utils');

jest.mock('../../../src/model/user.model');
jest.mock('../../../src/services/controller.services/crypto.service');
jest.mock('../../../src/utils/sanitize.util');

jest.useFakeTimers()

describe('Passport Service Unit Test', () => {
    afterEach(()=>{
        jest.clearAllTimers()
    })
    describe('verifyJwt function', () => {

        beforeEach(() => {
            jest.clearAllMocks(); // Clear any previous mocks before each test
        });

        test('should return false if jwt_payload does not contain an id', async () => {
            const jwt_payload = {};
            const done = jest.fn();

            await verifyJwt(jwt_payload, done);

            expect(done).toHaveBeenCalledWith(null, false);
            expect(User.findOne).not.toHaveBeenCalled();
        });

        test('should return sanitized user if user is found', async () => {
            const jwt_payload = { id: 'user123' };
            const done = jest.fn();
            const mockUser = { _id: 'user123', name: 'Test User' };
            const sanitizedUser = { id: 'user123', name: 'Test User' };

            User.findOne.mockResolvedValue(mockUser);
            sanitizeUtil.sanitizeUser.mockReturnValue(sanitizedUser);

            await verifyJwt(jwt_payload, done);

            expect(User.findOne).toHaveBeenCalledWith({ _id: jwt_payload.id });
            expect(sanitizeUtil.sanitizeUser).toHaveBeenCalledWith(mockUser);
            expect(done).toHaveBeenCalledWith(null, sanitizedUser);
        });

        test('should return false if no user is found', async () => {
            const jwt_payload = { id: 'user123' };
            const done = jest.fn();

            User.findOne.mockResolvedValue(null);

            await verifyJwt(jwt_payload, done);

            expect(User.findOne).toHaveBeenCalledWith({ _id: jwt_payload.id });
            expect(done).toHaveBeenCalledWith(null, false);
        });

        test('should handle errors and return false', async () => {
            const jwt_payload = { id: 'user123' };
            const done = jest.fn();
            const mockError = new Error('Database error');

            User.findOne.mockRejectedValue(mockError);

            await verifyJwt(jwt_payload, done);

            expect(User.findOne).toHaveBeenCalledWith({ _id: jwt_payload.id });
            expect(done).toHaveBeenCalledWith(mockError, false);
        });
    });

    describe('verifyLocal function', () => {

        beforeEach(() => {
            jest.clearAllMocks(); // Clear any previous mocks before each test
        });

        test('should return false with a message if user is not found', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const done = jest.fn();

            User.findOne.mockReturnValue({
                exec: jest.fn().mockResolvedValue(null)
            });


            await verifyLocal(email, password, done);

            expect(User.findOne).toHaveBeenCalledWith({ email });
            expect(done).toHaveBeenCalledWith(null, false, { message: "No such user email" });
            expect(cryptoService.crytpoJwt).not.toHaveBeenCalled();
        });

        test('should call crytpoJwt if user is found', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const done = jest.fn();
            const mockUser = { _id: 'user123', email: 'test@example.com' };

            User.findOne.mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockUser)
            });

            await verifyLocal(email, password, done);
            await jest.runAllTimersAsync()

            expect(User.findOne).toHaveBeenCalledWith({ email });
            expect(cryptoService.crytpoJwt).toHaveBeenCalledWith(mockUser, password, done);
            expect(done).not.toHaveBeenCalledWith(null, false, { message: "No such user email" });
        });

        test('should handle errors and call done with the error', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const done = jest.fn();
            const mockError = new Error('Database error');

            User.findOne.mockReturnValue({
                exec: jest.fn().mockRejectedValue(mockError)
            });

            await verifyLocal(email, password, done);
            await jest.runAllTimersAsync()

            expect(User.findOne).toHaveBeenCalledWith({ email });
            expect(done).toHaveBeenCalledWith(mockError);
            expect(cryptoService.crytpoJwt).not.toHaveBeenCalled();
        });
    });

})
