const Joi = require('joi');
const { apiUtil } = require('.');
const httpStatus = require('http-status');

const validate = (obj, schema) => {
    const { error } = schema.validate(obj);
    if (error) throw new apiUtil.ApiError(httpStatus.BAD_REQUEST, error.details[0].message);
}

const validateSignup = Joi.object({
    email: Joi.string().email().required(),
    // The .custom() function takes two arguments: value (the value being validated) and helpers (an object that provides utilities like creating errors).
    // The .test() method is used with regular expressions to test if a string matches a pattern.
    password: Joi.string().min(8).required().custom((value, helpers) => {
        // Check if the password contains at least one letter
        if (!/[a-zA-Z]/.test(value)) {
            return helpers.message('Password must contain at least one letter');
        }
        // Check if the password contains at least one number
        if (!/[0-9]/.test(value)) {
            return helpers.message('Password must contain at least one number');
        }
        // If the password meets all criteria, return the value
        return value;
    }, 'Password Validation')
});

const validateReset = Joi.object({
    password: Joi.string().min(8).required().custom((value, helpers) => {
        // Check if the password contains at least one letter
        if (!/[a-zA-Z]/.test(value)) {
            return helpers.message('Password must contain at least one letter');
        }
        // Check if the password contains at least one number
        if (!/[0-9]/.test(value)) {
            return helpers.message('Password must contain at least one number');
        }
        // If the password meets all criteria, return the value
        return value;
    }, 'Password Validation')
});

module.exports = {
    validate,
    validateSignup,
    validateReset
}
