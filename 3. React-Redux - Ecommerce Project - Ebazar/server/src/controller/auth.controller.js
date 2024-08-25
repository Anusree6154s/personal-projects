
const jwt = require("jsonwebtoken");
const status = require('http-status')
const { env } = require("../config/env.config.js");
const { User } = require("../model/user.model.js");
const { validate, validateSignup, validateReset } = require('../utils/validation.util.js')
const { catchAsyncUtil, apiUtil, sanitizeUtil } = require("../utils/index.js");
const { cryptoService } = require("../services/controller.services/crypto.service.js");
const { authService } = require("../services/auth.services/auth.service.js");

/**
 * Creates a new user, signs them in, and returns a JWT token in a cookie.
 * @function
 * @name createUser
 * @memberof module:controller/auth.controller.js
 * @param {Object} req - Express request object, expects user data in `req.body`.
 * @param {Object} res - Express response object, sends back sanitized user data and JWT cookie.
 * @returns {Promise<void>} Responds with the created user's data and a JWT token in a cookie.
 * @throws {apiUtil.ApiError} Throws an error if user signup fails.
 */
exports.createUser = catchAsyncUtil.catchAsync(async (req, res) => {
  validate({ email: req.body.email, password: req.body.password }, validateSignup)

  const data = await cryptoService.crytpoSignup(req.body)
  const token = jwt.sign(sanitizeUtil.santizeUser(data), env.jwt.secret_key);

  res
    .cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(status.CREATED)
    .json(sanitizeUtil.santizeUser(data));
})

/**
 * Logs in a user by sending their token in a cookie.
 * @function
 * @name loginUser
 * @memberof module:controller/auth.controller.js
 * @param {Object} req - Express request object, expects `req.user` containing token and user info.
 * @param {Object} res - Express response object, sends JWT cookie and user information.
 * @returns {Promise<void>} Responds with the user's information and a JWT token in a cookie.
 */
exports.loginUser = catchAsyncUtil.catchAsync(async (req, res) => {
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000), //1hr
      httpOnly: true,
    })
    .status(status.OK)
    .json(req.user.info);
})


/**
 * Logs out a user by clearing the JWT cookie.
 * @function
 * @name logoutUser
 * @memberof module:controller/auth.controller.js
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object, clears the JWT cookie.
 * @returns {Promise<void>} Responds with a status of 200 (OK) and clears the JWT cookie.
 */
exports.logoutUser = catchAsyncUtil.catchAsync(async (req, res) => {
  res
    .cookie("jwt", '', { expires: new Date(0) })
    .status(status.OK)
    .json({ id: null })
})


/**
 * Checks if a user is authenticated and returns their information.
 * @function
 * @name checkAuth
 * @memberof module:controller/auth.controller.js
 * @param {Object} req - Express request object, expects `req.user` containing user info.
 * @param {Object} res - Express response object, sends back user info if authenticated.
 * @returns {Promise<void>} Responds with the authenticated user's information.
 * @throws {apiUtil.ApiError} Throws a 401 (Unauthorized) error if the user is not authenticated.
 */
exports.checkAuth = catchAsyncUtil.catchAsync(async (req, res) => {
  if (req.user) res.status(status.OK).json(req.user);
  throw new apiUtil.ApiError(status.UNAUTHORIZED)
})


/**
 * Sends a One-Time Password (OTP) to the user's email for verification purposes.
 * @function
 * @name sendOTP
 * @memberof module:controller/auth.controller.js
 * @param {Object} req - Express request object, expects `email` and `OTP` in `req.body`.
 * @param {Object} res - Express response object, sends success response after sending OTP.
 * @returns {Promise<void>} Responds with a success message after sending OTP.
 * @throws {apiUtil.ApiError} Throws a 404 (Not Found) error if the email is not found in the database.
 */
exports.sendOTP = catchAsyncUtil.catchAsync(async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user.length === 0) {
    throw new apiUtil.ApiError(status.NOT_FOUND, "Email doesn't exist")
  }
  await authService.sendEmail(req.body.email, req.body.OTP, user[0].id);
  res.status(status.OK).send('OTP sent successfully');
})



/**
 * Resets a user's password using their ID.
 * @function
 * @name resetPassword
 * @memberof module:controller/auth.controller.js
 * @param {Object} req - Express request object, expects `id` in `req.params` and new password in `req.body`.
 * @param {Object} res - Express response object, sends success message after resetting password.
 * @returns {Promise<void>} Responds with a success message after resetting the password.
 * @throws {apiUtil.ApiError} Throws an error if the password reset fails.
 */
exports.resetPassword = catchAsyncUtil.catchAsync(async (req, res) => {
  validate({ password: req.body.password }, validateReset)

  await cryptoService.crytpoReset(req.params.id, req.body.password)
  res.status(status.OK).send('Password has been reset')
})
