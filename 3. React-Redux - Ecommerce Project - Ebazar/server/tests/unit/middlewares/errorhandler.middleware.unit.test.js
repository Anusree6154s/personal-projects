const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { errorHandler } = require('../../../src/middlewares/errorhandler.middleware'); 
const { mockRequest, mockResponse, mockNext } = require('../../mocks/middlware.mock'); 


describe('errorHandler middleware', () => {
    
    test('should handle mongoose.CastError and return a custom message with BAD_REQUEST status', () => {
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();

        const castError = new mongoose.Error.CastError('ObjectId', 'invalid_id', 'user');

        errorHandler(castError, req, res, next);

        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid user: invalid_id' });
    });

    test('should handle errors with a statusCode and return the error message', () => {
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();

        const customError = {
            message: 'Custom error message',
            statusCode: httpStatus.FORBIDDEN,
        };

        errorHandler(customError, req, res, next);

        expect(res.status).toHaveBeenCalledWith(httpStatus.FORBIDDEN);
        expect(res.json).toHaveBeenCalledWith({ message: 'Custom error message' });
    });

    test('should handle validation errors and set statusCode to BAD_REQUEST', () => {
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();

        const validationError = {
            message: 'Validation error occurred',
            errors: { name: { message: 'Name is required' } }
        };

        errorHandler(validationError, req, res, next);

        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({ message: 'Validation error occurred' });
    });

    test('should handle generic errors and return a message with the specified statusCode', () => {
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();

        const genericError = {
            message: 'Generic error',
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        };

        errorHandler(genericError, req, res, next);

        expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith({ message: 'Generic error' });
    });

    test('should handle errors without a statusCode and return a default statusCode', () => {
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext();

        const noStatusCodeError = {
            message: 'Error without status code',
        };

        errorHandler(noStatusCodeError, req, res, next);

        expect(res.status).toHaveBeenCalledWith(undefined);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error without status code' });
    });
});
