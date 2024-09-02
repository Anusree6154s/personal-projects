const Joi = require('joi');
const httpStatus = require('http-status');

const { validate, validateSignup, validateReset } = require('../../../src/utils/validation.util');
const { apiUtil } = require('../../../src/utils');

describe('Validation Util Unit test',()=>{
    describe('validate function', () => {
        const schema = Joi.object({
            name: Joi.string().required(),
            age: Joi.number().integer().min(0).required()
        });
    
        test('should throw an ApiError if validation fails', () => {
            const invalidObj = { name: 'John' }; // Missing 'age'
    
            const mockError = new apiUtil.ApiError(httpStatus.BAD_REQUEST, 'age is required');
            jest.spyOn(apiUtil, 'ApiError').mockImplementation(() => mockError);
    
            expect(() => validate(invalidObj, schema)).toThrow(mockError);
    
            jest.restoreAllMocks();
        });
    
        test('should not throw an error if validation passes', () => {
            const validObj = { name: 'John', age: 30 };
    
            expect(() => validate(validObj, schema)).not.toThrow();
        });
    });
    
    describe('validateSignup schema', () => {
        test('should validate correctly for valid input', () => {
            const validInput = {
                email: 'test@example.com',
                password: 'Password123'
            };
    
            const { error } = validateSignup.validate(validInput);
            expect(error).toBeUndefined(); // No error should be present
        });
    
        test('should throw an error if email is invalid', () => {
            const invalidInput = {
                email: 'invalid-email',
                password: 'Password123'
            };
    
            const { error } = validateSignup.validate(invalidInput);
            expect(error).toBeDefined(); // Error should be present
            expect(error.details[0].message).toBe('"email" must be a valid email');
        });
    
        test('should throw an error if password is too short', () => {
            const invalidInput = {
                email: 'test@example.com',
                password: 'Short1'
            };
    
            const { error } = validateSignup.validate(invalidInput);
            expect(error).toBeDefined(); // Error should be present
            expect(error.details[0].message).toBe('"password" length must be at least 8 characters long');
        });
    
        test('should throw an error if password lacks letters', () => {
            const invalidInput = {
                email: 'test@example.com',
                password: '12345678'
            };
    
            const { error } = validateSignup.validate(invalidInput);
            expect(error).toBeDefined(); // Error should be present
            expect(error.details[0].message).toBe('Password must contain at least one letter');
        });
    
        test('should throw an error if password lacks numbers', () => {
            const invalidInput = {
                email: 'test@example.com',
                password: 'Password'
            };
    
            const { error } = validateSignup.validate(invalidInput);
            expect(error).toBeDefined(); // Error should be present
            expect(error.details[0].message).toBe('Password must contain at least one number');
        });
    });
    
    describe('validateReset schema', () => {
        test('should validate correctly for valid password', () => {
            const validInput = {
                password: 'Password123'
            };
    
            const { error } = validateReset.validate(validInput);
            expect(error).toBeUndefined(); // No error should be present
        });
    
        test('should throw an error if password is too short', () => {
            const invalidInput = {
                password: 'Short1'
            };
    
            const { error } = validateReset.validate(invalidInput);
            expect(error).toBeDefined(); // Error should be present
            expect(error.details[0].message).toBe('"password" length must be at least 8 characters long');
        });
    
        test('should throw an error if password lacks letters', () => {
            const invalidInput = {
                password: '12345678'
            };
    
            const { error } = validateReset.validate(invalidInput);
            expect(error).toBeDefined(); // Error should be present
            expect(error.details[0].message).toBe('Password must contain at least one letter');
        });
    
        test('should throw an error if password lacks numbers', () => {
            const invalidInput = {
                password: 'Password'
            };
    
            const { error } = validateReset.validate(invalidInput);
            expect(error).toBeDefined(); // Error should be present
            expect(error.details[0].message).toBe('Password must contain at least one number');
        });
    });
})

