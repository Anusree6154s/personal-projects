
const mongoose = require('mongoose');
const { WishList } = require('../model/wishlist.model.js')
const { catchAsyncUtil, apiUtil } = require("../utils/index.js");
const status = require('http-status');
const { ApiError } = require('../utils/ApiError.util.js');
const httpStatus = require('http-status');


/**
 * Adds a product to the user's wishlist.
 * Creates a new wishlist entry with the product information provided in the request body.
 * @function
 * @name addToWishList
 * @memberof module:controller/wishlist.controller.js
 * @param {Object} req - Express request object. Expects wishlist data in `req.body`.
 * @param {Object} res - Express response object. Responds with the newly created wishlist item.
 * @returns {Promise<void>} Responds with the created wishlist item after populating product details.
 */
exports.addToWishList = catchAsyncUtil.catchAsync(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.product)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid product ID.');
    }

    const wishList = new WishList(req.body)
    const data = await wishList.save()
    await data.populate('product')
    res.status(status.OK).json(data);
})


/**
 * Fetches the user's wishlist.
 * Retrieves all products in the wishlist for the authenticated user.
 * @function
 * @name fetchWishListByUser
 * @memberof module:controller/wishlist.controller.js
 * @param {Object} req - Express request object. Expects `id` in `req.user` to identify the user.
 * @param {Object} res - Express response object. Responds with the user's wishlist items.
 * @returns {Promise<void>} Responds with the user's wishlist items after populating product details.
 * @throws {apiUtil.ApiError} Throws a 404 (Not Found) error if no products are found in the wishlist.
 */
exports.fetchWishListByUser = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.user
    const data = await WishList.find({ user: id }).populate('product')
    // if (data.length == 0) {
    //     throw new apiUtil.ApiError(status.NOT_FOUND, "No products in wishlist.");
    // }
    res.status(status.OK).json(data);
})


/**
 * Deletes a product from the user's wishlist.
 * Removes the specified product from the wishlist using the product ID.
 * @function
 * @name deleteFromWishList
 * @memberof module:controller/wishlist.controller.js
 * @param {Object} req - Express request object. Expects `id` in `req.params` to identify the wishlist item to be deleted.
 * @param {Object} res - Express response object. Responds with a confirmation message after deletion.
 * @returns {Promise<void>} Responds with a confirmation message indicating the product was deleted.
 */
exports.deleteFromWishList = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.params
    let data = await WishList.findByIdAndDelete(id)
    if (!data) {
        throw new apiUtil.ApiError(status.NOT_FOUND, "Wishlist item not found");
    }
    res.status(status.OK).json('Product deleted from wishlist.');
})
