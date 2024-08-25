
const status = require('http-status');
const { catchAsyncUtil, apiUtil } = require("../utils/index.js");
const httpStatus = require('http-status');
const { Cart } = require('../model/cart.model');

/**
 * Controller to add a product to the cart.
 * 
 * @function
 * @name addToCart
 * @memberof module:controller/cart.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing the cart data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the created cart item and status code 201 (Created)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.addToCart = catchAsyncUtil.catchAsync(async (req, res) => {
    const cart = new Cart(req.body);
    const data = await cart.save();
    await data.populate('product');
    res.status(status.CREATED).json(data);
});


/**
 * Controller to fetch all cart items for a specific user.
 * 
 * @function
 * @name fetchCartByUser
 * @memberof module:controller/cart.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.user - The user object containing user details
 * @param {string} req.user.id - The ID of the user whose cart items are to be fetched
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the list of cart items and status code 200 (OK)
 * @throws {apiUtil.ApiError} Throws a 404 error if no items are found in the cart
 */
exports.fetchCartByUser = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.user;
    const data = await Cart.find({ user: id }).populate('product');
    if (!data) throw new apiUtil.ApiError(httpStatus.NOT_FOUND, 'No items in cart.')
    res.status(status.OK).json(data);
});


/**
 * Controller to delete an item from cart
 * 
 * @function
 * @name deleteFromCart
 * @memberof module:controller/cart.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - The request parameters containing the cart item ID
 * @param {string} req.params.id - The ID of the cart item to be deleted
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the deleted cart item and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.deleteFromCart = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Cart.findByIdAndDelete(id);
    if (!data) throw new apiUtil.ApiError(httpStatus.NOT_FOUND, 'Empty cart')
    res.status(status.OK).json(data);
});


/**
 * Controller to update a specific cart item.
 * 
 * @function
 * @name updateCart
 * @memberof module:controller/cart.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - The request parameters containing the cart item ID
 * @param {string} req.params.id - The ID of the cart item to be updated
 * @param {Object} req.body - The request body containing the updated cart data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the updated cart item and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.updateCart = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    // console.log(!!updateData)
    if (Object.keys(updateData).length === 0) throw new apiUtil.ApiError(httpStatus.BAD_REQUEST, 'No update item provided')
    const data = await Cart.findByIdAndUpdate(id, updateData, { new: true });
    if (!data) throw new apiUtil.ApiError(httpStatus.NOT_FOUND, 'Cart item does not exist')
    await data.populate('product');
    res.status(status.OK).json(data);
});