
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const { env } = require("../config/env.config");
const { catchAsyncUtil, validationUtil, apiUtil, sanitizeUtil } = require("../utils");
const { cryptoService, authService } = require("../services");
const { User } = require("../model/user.model");
const { ApiError } = require("../utils/ApiError.util");

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
  validationUtil.validate({
    email: req.body.email,
    password: req.body.password
  },
    validationUtil.validateSignup
  )

  const data = await cryptoService.crytpoSignup(req.body)
  const token = jwt.sign(sanitizeUtil.sanitizeUser(data), env.jwt.secret_key);

  res
    .cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(httpStatus.CREATED)
    .json(sanitizeUtil.sanitizeUser(data));
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
    .status(httpStatus.OK)
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
    .cookie("jwt", '', { expires: new Date(0), httpOnly: true })
    .status(httpStatus.OK)
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
  if (req.user) res.status(httpStatus.OK).json(req.user);

  throw new apiUtil.ApiError(httpStatus.UNAUTHORIZED, 'Check Failed')
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
exports.sendOTP = catchAsyncUtil.catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new apiUtil.ApiError(httpStatus.NOT_FOUND, "Email doesn't exist");
  }
  await authService.sendEmail(req.body.email, req.body.OTP, user.id);
  res.status(httpStatus.OK).json({ message: 'OTP sent successfully' });
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
  validationUtil.validate({ password: req.body.password }, validationUtil.validateReset)
  // if (!value.result) throw new apiUtil.ApiError(httpStatus.BAD_REQUEST, value.error)

  await cryptoService.crytpoReset(req.params.id, req.body.password)
  res.status(httpStatus.OK).json({ message: 'Password has been reset' })
})
