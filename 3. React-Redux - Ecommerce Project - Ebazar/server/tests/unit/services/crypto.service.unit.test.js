const jwt = require('jsonwebtoken');
const { sanitizeUtil, cryptoUtil, apiUtil } = require('../../../src/utils');
const crypto = require("crypto");
const { crytpoJwt, crytpoSignup, crytpoReset } = require('../../../src/services/controller.services/crypto.service');
const { authService } = require('../../../src/services');
const { User } = require('../../../src/model/user.model');

jest.mock('../../../src/utils/crypto.util');
jest.mock('../../../src/utils/sanitize.util');
jest.mock('jsonwebtoken');
jest.mock('crypto');
jest.mock('../../../src/utils/ApiError.util');
jest.mock('../../../src/services/auth.services/auth.service');
jest.mock('../../../src/model/user.model');

describe('Crypto Service Unit Test', () => {
    afterEach(async () => {
        await jest.clearAllMocks()
    })
    describe('crytpoJwt', () => {
        test('should validate the user credentials and return a token', async () => {
            const user = {
                _id: 'user123',
                password: Buffer.from('hashed_password'),
                salt: 'random_salt'
            };
            const password = 'user_password';
            const done = jest.fn();

            cryptoUtil.hashPassword.mockResolvedValue(Buffer.from('hashed_password'));
            crypto.timingSafeEqual.mockReturnValue(true);
            jwt.sign.mockReturnValue('generated_token');
            sanitizeUtil.sanitizeUser.mockReturnValue({ id: 'user123', name: 'Test User' });

            await crytpoJwt(user, password, done);

            expect(cryptoUtil.hashPassword).toHaveBeenCalledWith(password, user.salt);
            expect(crypto.timingSafeEqual).toHaveBeenCalledWith(user.password, Buffer.from('hashed_password'));
            expect(jwt.sign).toHaveBeenCalledWith({ id: user._id }, process.env.SECRET_KEY);
            expect(done).toHaveBeenCalledWith(null, { info: { id: 'user123', name: 'Test User' }, token: 'generated_token' });
        });

        test('should return "Invalid credentials" when password is incorrect', async () => {
            const user = {
                _id: 'user123',
                password: Buffer.from('hashed_password'),
                salt: 'random_salt'
            };
            const password = 'wrong_password';
            const done = jest.fn();

            // Mock the hashPassword function to return a different hashed password
            cryptoUtil.hashPassword.mockResolvedValue(Buffer.from('wrong_hashed_password'));

            // Mock the timingSafeEqual function to return false
            crypto.timingSafeEqual.mockReturnValue(false);

            // Call the crytpoJwt function
            await crytpoJwt(user, password, done);

            // Assertions
            expect(cryptoUtil.hashPassword).toHaveBeenCalledWith(password, user.salt);
            expect(crypto.timingSafeEqual).toHaveBeenCalledWith(user.password, Buffer.from('wrong_hashed_password'));
            expect(done).toHaveBeenCalledWith(null, false, { message: 'Invalid credentials' });
        });

        test('should throw an ApiError if an error occurs during hashing', async () => {
            const user = {
                _id: 'user123',
                password: Buffer.from('hashed_password'),
                salt: 'random_salt'
            };
            const password = 'user_password';
            const done = jest.fn();

            const mockError = new Error('Hashing failed');
            cryptoUtil.hashPassword.mockRejectedValue(mockError);
            crypto.randomBytes.mockReturnValue(user.salt)

            let caughtError;
            try {
                await crytpoReset(user._id, password);
            } catch (error) {
                caughtError = error;
            }

            expect(caughtError).toBeInstanceOf(apiUtil.ApiError);

            expect(cryptoUtil.hashPassword).toHaveBeenCalledWith(password, user.salt);
            expect(done).not.toHaveBeenCalled();
        });

    })

    describe('crytpoSignup', () => {
        test('should create a user with a hashed password', async () => {
            const body = {
                email: 'test@example.com',
                password: 'user_password',
                name: 'Test User',
            };

            const salt = Buffer.from('random_salt');
            const hashedPassword = Buffer.from('hashed_password');
            const mockUserData = {
                _id: 'user123',
                email: body.email,
                name: body.name
            };

            crypto.randomBytes.mockReturnValue(salt);
            cryptoUtil.hashPassword.mockResolvedValue(hashedPassword);
            authService.createUser.mockResolvedValue(mockUserData);
            const result = await crytpoSignup(body);

            expect(crypto.randomBytes).toHaveBeenCalledWith(16);
            expect(cryptoUtil.hashPassword).toHaveBeenCalledWith(body.password, salt);
            expect(authService.createUser).toHaveBeenCalledWith({ email: body.email, name: body.name }, hashedPassword, salt);
            expect(result).toEqual(mockUserData);
        });

        test('should throw an ApiError if an error occurs during hashing', async () => {
            const body = {
                _id: 'user123',
                email: 'test@example.com',
                password: 'user_password',
                name: 'Test User'
            };

            const salt = Buffer.from('random_salt');

            // Mock the crypto.randomBytes to return the salt
            crypto.randomBytes.mockReturnValue(salt);

            // Mock the hashPassword function to throw an error
            const mockError = new Error('Hashing failed');
            cryptoUtil.hashPassword.mockRejectedValue(mockError);

            let caughtError;
            try {
                await crytpoReset(body._id, body.password);
            } catch (error) {
                caughtError = error;
            }

            expect(caughtError).toBeInstanceOf(apiUtil.ApiError);

            // Assertions
            expect(crypto.randomBytes).toHaveBeenCalledWith(16);
        });

        test('should throw an ApiError if an error occurs during hashing', async () => {
            const body = {
                _id: 'user123',
                email: 'test@example.com',
                password: 'user_password',
                name: 'Test User'
            };

            const salt = Buffer.from('random_salt');

            // Mock the crypto.randomBytes to return the salt
            crypto.randomBytes.mockReturnValue(salt);

            // Mock the hashPassword function to throw an error
            const mockError = new Error('Hashing failed');
            cryptoUtil.hashPassword.mockRejectedValue(mockError);

            let caughtError;
            try {
                await crytpoReset(body._id, body.password);
            } catch (error) {
                caughtError = error;
            }

            expect(caughtError).toBeInstanceOf(apiUtil.ApiError);

            // Assertions
            expect(crypto.randomBytes).toHaveBeenCalledWith(16);
            expect(cryptoUtil.hashPassword).toHaveBeenCalledWith(body.password, salt);
        });
    })

    describe('crytpoReset', () => {
        test('should reset the user\'s password successfully', async () => {
            const id = 'user123';
            const password = 'new_password';

            const salt = Buffer.from('random_salt');
            const hashedPassword = Buffer.from('hashed_password');

            // Mock the crypto.randomBytes to return the salt
            crypto.randomBytes.mockReturnValue(salt);

            // Mock the hashPassword function to return the hashed password
            cryptoUtil.hashPassword.mockResolvedValue(hashedPassword);

            // Mock the User.findByIdAndUpdate to resolve successfully
            User.findByIdAndUpdate.mockResolvedValue({ _id: id });

            // Call the crytpoReset function
            await crytpoReset(id, password);

            // Assertions
            expect(crypto.randomBytes).toHaveBeenCalledWith(16);
            expect(cryptoUtil.hashPassword).toHaveBeenCalledWith(password, salt);
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                id,
                { password: hashedPassword, salt },
                { new: true }
            );
        });
        test('should throw an ApiError if an error occurs during hashing', async () => {
            const id = 'user123';
            const password = 'new_password';

            const salt = Buffer.from('random_salt');

            // Mock the crypto.randomBytes to return the salt
            crypto.randomBytes.mockReturnValue(salt);

            // Mock the hashPassword function to throw an error
            const mockError = new Error('Hashing failed');
            cryptoUtil.hashPassword.mockRejectedValue(mockError);

            let caughtError;
            try {
                await crytpoReset(id, password);
            } catch (error) {
                caughtError = error;
            }
            expect(caughtError).toBeInstanceOf(apiUtil.ApiError);

            // Assertions
            expect(crypto.randomBytes).toHaveBeenCalledWith(16);
            expect(cryptoUtil.hashPassword).toHaveBeenCalledWith(password, salt);
            expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
        });
        test('should throw an ApiError if an error occurs during user update', async () => {
            const id = 'user123';
            const password = 'new_password';

            const salt = Buffer.from('random_salt');
            const hashedPassword = Buffer.from('hashed_password');

            crypto.randomBytes.mockReturnValue(salt);
            cryptoUtil.hashPassword.mockResolvedValue(hashedPassword);
            const mockError = new Error('User update failed');
            User.findByIdAndUpdate.mockRejectedValue(mockError);

            let caughtError;
            try {
                await crytpoReset(id, password);
            } catch (error) {
                caughtError = error;
            }

            expect(caughtError).toBeInstanceOf(apiUtil.ApiError);

            expect(crypto.randomBytes).toHaveBeenCalledWith(16);
            expect(cryptoUtil.hashPassword).toHaveBeenCalledWith(password, salt);
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                id,
                { password: hashedPassword, salt },
                { new: true }
            );
        });

    })
})
