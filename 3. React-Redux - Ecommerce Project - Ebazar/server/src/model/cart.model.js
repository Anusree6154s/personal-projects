const mongoose = require('mongoose')
const { Schema } = mongoose;
const { modelsUtil } = require('../utils');

const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', },
    user: { type: Schema.Types.ObjectId },
    quantity: { type: Number, },
})
modelsUtil.createVirtualID(cartSchema)

/**
 * Mongoose model for the Cart schema.
 * Defines the structure for a Cart document with the following fields:
 * 
 * - `product` (ObjectId, required): Reference to a Product document.
 * - `user` (ObjectId, required): Reference to a User document.
 * - `quantity` (Number, required): The quantity of the product in the cart.
 * 
 * @constant
 * @type {Model}
 * @returns {Model} - The Mongoose model for the Cart schema.
 */
exports.Cart = mongoose.model('Cart', cartSchema, 'cart')