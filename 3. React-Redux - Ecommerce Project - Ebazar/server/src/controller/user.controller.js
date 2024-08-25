
const { User } = require("../model/user.model.js");
const { catchAsyncUtil, apiUtil } = require("../utils/index.js");
const status = require('http-status');


/**
 * Fetches a user by their ID.
 * Retrieves user information based on the authenticated user's ID.
 * @function
 * @name fetchUserById
 * @memberof module:controller/user.controller.js
 * @param {Object} req - Express request object. Expects `req.user` containing the user's ID.
 * @param {Object} res - Express response object. Responds with the user's data if found.
 * @returns {Promise<void>} Responds with the user's information if found.
 * @throws {apiUtil.ApiError} Throws a 404 (Not Found) error if the user is not found.
 */
exports.fetchUserById = catchAsyncUtil.catchAsync(async (req, res) => {
  const { id } = req.user;
  const data = await User.findById(id, "name email id addresses role phone image orders address").exec();
  if (!data) {
    throw new apiUtil.ApiError(status.NOT_FOUND, "User not found");
  }
  res.status(status.OK).json(data);
})


/**
 * Updates a user by their ID.
 * Updates the user’s information with the data provided in the request body.
 * @function
 * @name updateUser
 * @memberof module:controller/user.controller.js
 * @param {Object} req - Express request object. Expects `id` in `req.params` and update data in `req.body`.
 * @param {Object} res - Express response object. Responds with the updated user's information.
 * @returns {Promise<void>} Responds with the updated user’s data if successful.
 * @throws {apiUtil.ApiError} Throws a 404 (Not Found) error if the user is not found.
 */
exports.updateUser = catchAsyncUtil.catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw new apiUtil.ApiError(status.NOT_FOUND, "User not found");
  }
  res.status(status.OK).json({
    id: data.id,
    email: data.email,
    role: data.role,
    addresses: data.addresses,
    address: data.address,
    name: data.name,
    phone: data.phone,
    image: data.image,
  });
})


