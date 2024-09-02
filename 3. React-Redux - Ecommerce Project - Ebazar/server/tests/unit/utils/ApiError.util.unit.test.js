// Import necessary modules
const httpStatus = require('http-status'); // Assuming http-status is used for status codes
const { ApiError } = require('../../../src/utils/ApiError.util');

describe('ApiError class', () => {

    test('should create an ApiError with provided statusCode and message', () => {
        const statusCode = 400;
        const message = 'Bad Request';
        const error = new ApiError(statusCode, message);

        expect(error.statusCode).toBe(statusCode);
        expect(error.message).toBe(message);
        expect(error.isOperational).toBe(true);
        expect(error.stack).toBeDefined(); // Should have a stack trace
    });

    test('should set a default statusCode to 500 if not provided', () => {
        const message = 'Internal Server Error';
        const error = new ApiError(undefined, message);

        expect(error.statusCode).toBe(500);
        expect(error.message).toBe(message);
        expect(error.isOperational).toBe(true);
        expect(error.stack).toBeDefined();
    });

    test('should set a default message based on statusCode if not provided', () => {
        const statusCode = 404;
        const error = new ApiError(statusCode);

        expect(error.statusCode).toBe(statusCode);
        expect(error.message).toBe(httpStatus[statusCode]); // "Not Found" for 404
        expect(error.isOperational).toBe(true);
        expect(error.stack).toBeDefined();
    });

    test('should set isOperational to true by default if not provided', () => {
        const statusCode = 403;
        const message = 'Forbidden';
        const error = new ApiError(statusCode, message);

        expect(error.isOperational).toBe(true);
    });

    test('should allow setting isOperational to false', () => {
        const statusCode = 401;
        const message = 'Unauthorized';
        const isOperational = false;
        const error = new ApiError(statusCode, message, isOperational);

        expect(error.isOperational).toBe(isOperational);
    });

    test('should capture stack trace if no stack is provided', () => {
        const statusCode = 500;
        const message = 'Internal Server Error';
        const error = new ApiError(statusCode, message);

        expect(error.stack).toBeDefined();
        expect(error.stack).toContain('ApiError');
    });

    test('should use provided stack trace if available', () => {
        const statusCode = 500;
        const message = 'Internal Server Error';
        const customStack = 'Custom stack trace';
        const error = new ApiError(statusCode, message, true, customStack);

        expect(error.stack).toBe(customStack);
    });
});
