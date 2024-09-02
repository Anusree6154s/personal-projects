/**
 * Middlewares for user authentication using Passport.js.
 * Provides JWT and local strategy authentication.
 *
 * @module middlewares/auth.middleware
 */

const passport = require("passport");
const httpStatus = require("http-status");
const { catchAsyncUtil, apiUtil } = require("../utils/index.js");


/**
 * The `passport.authenticate("jwt")` function is used to verify the JWT token provided in the request.
 * If authentication fails, it returns an `apiUtil.ApiError` with an unauthorized status.
 *
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
exports.isAuthJwt = catchAsyncUtil.catchAsync((req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
        //  console.log(err, user, info)
        if (err || !user)
            return next(new apiUtil.ApiError(httpStatus.UNAUTHORIZED, "Authentication Failed"))

        req.user = user;
        next()
    })(req, res, next)
})


/**
 * The `passport.authenticate("local")` function is used to verify the user's credentials (username and password).
 * If authentication fails, it responds with a 401 status and an error message.
 *
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
exports.isAuthLocal = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        // console.log(err, user, info)
        if (err || !user) {
            if (info.message == 'Missing credentials') {
                return res.status(httpStatus.BAD_REQUEST).json("Missing email or password");
            }
            if (info.message == 'No such user email' | info.message == 'Invalid credentials') {
                return res.status(httpStatus.UNAUTHORIZED).json("Email or password is incorrect.");
            }
        }

        req.user = user;
        next()
    })(req, res, next)
};

