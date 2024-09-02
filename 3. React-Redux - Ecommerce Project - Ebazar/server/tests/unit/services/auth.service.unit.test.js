const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const httpStatus = require('http-status');
const { sendEmail, createUser } = require('../../../src/services/auth.services/auth.service'); 
const { User } = require('../../../src/model/user.model');
const { apiUtil } = require('../../../src/utils');

jest.mock('fs');
jest.mock('nodemailer');
jest.mock('../../../src/model/user.model');

describe('Auth Service', () => {

    describe('sendEmail function', () => {
        const email = 'test@example.com';
        const OTP = '123456';
        const id = 'user123';
        const filePath = path.join(__dirname, 'email-template.html');

        beforeEach(() => {
            jest.clearAllMocks();
            process.env.SENDERS_EMAIL2 = 'sender@example.com';
            process.env.SENDERS_GMAIL_APP_PASSWORD2 = 'password';
        });

        test('should send an email successfully', async () => {
            // Mock the fs.readFile to return a valid HTML template
            fs.readFile.mockImplementation((path, options, callback) => {
                callback(null, '<p>Your OTP is: {{OTP}}</p>');
            });

            // Mock the nodemailer.createTransport and sendMail functions
            const mockSendMail = jest.fn((mail_configs, callback) => callback(null, { id }));
            nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });

            // Call the sendEmail function
            const result = await sendEmail(email, OTP, id);

            // Assertions
            expect(fs.readFile).toHaveBeenCalled()
            expect(mockSendMail).toHaveBeenCalledWith({
                from: process.env.SENDERS_EMAIL2,
                to: email,
                subject: "Ebazar PASSWORD RECOVERY",
                html: '<p>Your OTP is: 123456</p>',
            }, expect.any(Function));
            expect(result).toEqual({ id });
        });

        test('should return an error if reading the email template fails', async () => {
            // Mock the fs.readFile to simulate an error
            fs.readFile.mockImplementation((path, options, callback) => {
                callback(new Error('File read error'), null);
            });

            try {
                await sendEmail(email, OTP, id);
            } catch (error) {
                // Assertions
                expect(error).toEqual({
                    message: "Error reading email template",
                    statusCode: httpStatus.INTERNAL_SERVER_ERROR
                });
            }
        });

        test('should return an error if sending the email fails', async () => {
            // Mock the fs.readFile to return a valid HTML template
            fs.readFile.mockImplementation((path, options, callback) => {
                callback(null, '<p>Your OTP is: {{OTP}}</p>');
            });

            // Mock the nodemailer.createTransport and sendMail functions to simulate an error
            const mockSendMail = jest.fn((mail_configs, callback) => callback(new Error('Email send error'), null));
            nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });

            try {
                await sendEmail(email, OTP, id);
            } catch (error) {
                // Assertions
                expect(mockSendMail).toHaveBeenCalledWith({
                    from: process.env.SENDERS_EMAIL2,
                    to: email,
                    subject: "Ebazar PASSWORD RECOVERY",
                    html: '<p>Your OTP is: 123456</p>',
                }, expect.any(Function));
                expect(error).toEqual({
                    message: "Error occurred in sending email",
                    statusCode: httpStatus.INTERNAL_SERVER_ERROR
                });
            }
        });
    });

    describe('createUser function', () => {
        const userDetails = { email: 'test@example.com', name: 'Test User' };
        const password = 'hashedPassword';
        const salt = 'salt';

        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('should create a user successfully and return the user data', async () => {
            // Mock the User.create method to return the created user data
            const mockUserData = { _id: 'userId123', ...userDetails, password, salt };
            User.create.mockResolvedValue(mockUserData);

            // Call the createUser function
            const result = await createUser(userDetails, password, salt);

            // Assertions
            expect(User.create).toHaveBeenCalledWith({ ...userDetails, password, salt });
            expect(result).toEqual(mockUserData);
        });

        test('should throw a NOT_FOUND error if user creation returns null', async () => {
            // Mock the User.create method to return null
            User.create.mockResolvedValue(null);

            try {
                await createUser(userDetails, password, salt);
            } catch (error) {
                // Assertions
                expect(User.create).toHaveBeenCalledWith({ ...userDetails, password, salt });
                expect(error).toBeInstanceOf(apiUtil.ApiError);
                expect(error.statusCode).toBe(httpStatus.NOT_FOUND);
                expect(error.message).toBe('Error creating user');
            }
        });

        test('should throw a CONFLICT error if email is already in use (duplicate key error)', async () => {
            // Mock the User.create method to throw a duplicate key error
            const mockError = { code: 11000 };
            User.create.mockRejectedValue(mockError);

            try {
                await createUser(userDetails, password, salt);
            } catch (error) {
                // Assertions
                expect(User.create).toHaveBeenCalledWith({ ...userDetails, password, salt });
                expect(error).toBeInstanceOf(apiUtil.ApiError);
                expect(error.statusCode).toBe(httpStatus.CONFLICT);
                expect(error.message).toBe('Email is already in use.');
            }
        });

        test('should throw a custom error for other errors', async () => {
            // Mock the User.create method to throw a custom error
            const mockError = { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' };
            User.create.mockRejectedValue(mockError);

            try {
                await createUser(userDetails, password, salt);
            } catch (error) {
                // Assertions
                expect(User.create).toHaveBeenCalledWith({ ...userDetails, password, salt });
                expect(error).toBeInstanceOf(apiUtil.ApiError);
                expect(error.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
                expect(error.message).toBe('Internal Server Error');
            }
        });
    });
})