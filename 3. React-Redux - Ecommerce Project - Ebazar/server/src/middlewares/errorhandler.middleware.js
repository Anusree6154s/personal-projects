const httpStatus = require("http-status");
const mongoose = require('mongoose');

exports.errorHandler = (err, req, res, next) => {
    if (err instanceof mongoose.Error.CastError) {
        const customMessage = `Invalid ${err.path}: ${err.value}`;
        return res.status(httpStatus.BAD_REQUEST).json({ error: customMessage });
    }
    // console.log('errorHandler error:', err)
    // console.log('errorHandler error message:', err.message)
    if (err.errors || err.kind) err.statusCode = httpStatus.BAD_REQUEST
    res.status(err.statusCode).json({ message: err.message })
}