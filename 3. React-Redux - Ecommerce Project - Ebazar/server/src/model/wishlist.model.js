const mongoose = require('mongoose')
const { Schema } = mongoose;
const { modelsUtil } = require('../utils');

const wishListSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', },
    user: { type: Schema.Types.ObjectId },
})
modelsUtil.
createVirtualID(wishListSchema)


/**
 * Mongoose model for the WishList schema.
 * Defines the structure for a WishList document with the following fields:
 * 
 * - `product` (ObjectId, required): Reference to the Product document in the wishlist.
 * - `user` (ObjectId, required): Reference to the User who owns the wishlist.
 * 
 * @constant
 * @type {Model}
 * @returns {Model} - The Mongoose model for the WishList schema.
 */
exports.WishList = mongoose.model('WishList', wishListSchema, 'wishList')