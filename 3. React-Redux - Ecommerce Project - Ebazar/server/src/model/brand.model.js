const mongoose = require('mongoose');
const { Schema } = mongoose;
const { modelsUtil } = require('../utils');

const brandSchema = new Schema({
    value: { type: String, required: true, unique: true },
    label: { type: String, required: true, unique: true },
})

modelsUtil.createVirtualID(brandSchema)


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
exports.Brand = mongoose.model('Brand', brandSchema)
