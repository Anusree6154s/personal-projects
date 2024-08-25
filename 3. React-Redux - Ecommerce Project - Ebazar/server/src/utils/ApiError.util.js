const status = require('http-status')


/**
 * Custom error class to handle API errors with specific status codes and messages.
 * Extends the built-in Error class to include additional properties for better error handling.
 *
 * @class
 * @extends Error
 * @param {number} statusCode - The HTTP status code associated with the error.
 * @param {string} [message] - The error message. Defaults to the status code description if not provided.
 * @param {boolean} [isOperational=true] - Indicates whether the error is operational or not.
 * @param {string} [stack=""] - The stack trace of the error. If not provided, it is captured automatically.
 */
class ApiError extends Error {
    constructor(
        statusCode,
        message,
        isOperational = true,
        stack = ""
    ) {
        let msg = message || status[this.statusCode] || 'Internal Server Error'
        super(msg);
        this.statusCode = statusCode || status[this.message] || 500;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = {ApiError};
