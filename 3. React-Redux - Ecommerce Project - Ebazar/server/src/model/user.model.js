const mongoose = require('mongoose')
const { Schema } = mongoose;
const { modelsUtil } = require('../utils');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: Buffer, required: true },
    role: { type: String, default: 'user' },
    addresses: { type: [Schema.Types.Mixed] },
    address: { type: Schema.Types.Mixed },
    //TODO: seperate schemas for this
    name: { type: String },
    phone: { type: Number },
    image: { type: Schema.Types.Mixed },
    orders: { type: [Schema.Types.Mixed] },
    salt: Buffer
})

modelsUtil.
createVirtualID(userSchema)


/**
 * Mongoose model for the User schema.
 * Defines the structure for a User document with the following fields:
 * 
 * - `email` (String, required, unique): The user's email address, must be unique.
 * - `password` (Buffer, required): The user's hashed password.
 * - `role` (String, required, default: 'user'): The role of the user, defaults to 'user'.
 * - `addresses` (Array of Mixed): Array containing multiple addresses for the user.
 * - `address` (Mixed): A single address for the user.
 * - `name` (String): The user's full name.
 * - `phone` (Number): The user's phone number.
 * - `image` (Mixed): URL or other data related to the user's profile image.
 * - `orders` (Array of Mixed): Array containing orders associated with the user.
 * - `salt` (Buffer): Salt used for password hashing.
 * 
 * @constant
 * @type {Model}
 * @returns {Model} - The Mongoose model for the User schema.
 */
exports.User = mongoose.model('User', userSchema)
