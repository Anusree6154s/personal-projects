const mongoose = require('mongoose');
const { modelsUtil } = require('../utils');
const { Schema } = mongoose;

const productSchema = new Schema({
    // id: { type: Number },
    title: { type: String },
    description: { type: String },
    price: { type: Number, min: 0 },
    discountPercentage: { type: Number, min: 0, max: 100 },
    rating: { type: Number, min: 0, max: 5 },
    stock: { type: Number, min: 0 },
    brand: { type: String },
    category: { type: String },
    thumbnail: { type: String },
    images: { type: [String] },
    highlights: { type: [String] },
    deleted: { type: Boolean, default: false },
})
modelsUtil.createVirtualID(productSchema)


/**
 * Mongoose model for the Product schema.
 * Defines the structure for a Product document with the following fields:
 * 
 * - `title` (String): The title of the product.
 * - `description` (String): Description of the product.
 * - `price` (Number, min: 0): Price of the product, must be non-negative.
 * - `discountPercentage` (Number, min: 0, max: 100): Discount percentage on the product, ranging from 0 to 100.
 * - `rating` (Number, min: 0, max: 5): Rating of the product, ranging from 0 to 5.
 * - `stock` (Number, min: 0): Available stock of the product, must be non-negative.
 * - `brand` (String): Brand name of the product.
 * - `category` (String): Category of the product.
 * - `thumbnail` (String): URL of the product's thumbnail image.
 * - `images` (Array of Strings): URLs of additional images of the product.
 * - `highlights` (Array of Strings): Key highlights or features of the product.
 * - `deleted` (Boolean): Indicates if the product is marked as deleted.
 * 
 * @constant
 * @type {Model}
 * @returns {Model} - The Mongoose model for the Product schema.
 */
exports.Product = mongoose.model('Product', productSchema)
