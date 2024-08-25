const mongoose = require('mongoose')
const { Schema } = mongoose;
const { modelsUtil } = require('../utils');

const orderSchema = new Schema({
    items: { type: [Schema.Types.Mixed] },
    totalPrice: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId },
    paymentMethod: { type: String },
    status: { type: String, default: 'Pending' },
    selectedAddress: { type: Schema.Types.Mixed },
    date: { type: String },
    email: { type: String }
})
modelsUtil.
createVirtualID(orderSchema)


/**
 * Mongoose model for the Order schema.
 * Defines the structure for an Order document with the following fields:
 * 
 * - `items` (Array of Mixed): Array containing items in the order.
 * - `totalPrice` (Number): Total price of the order.
 * - `totalItems` (Number): Total number of items in the order.
 * - `user` (ObjectId): Reference to the User who placed the order.
 * - `paymentMethod` (String): Payment method used for the order.
 * - `status` (String, default: 'Pending'): Status of the order.
 * - `selectedAddress` (Mixed): Address selected for delivery.
 * - `date` (String): Date when the order was placed.
 * - `email` (String): Email address of the user who placed the order.
 * 
 * @constant
 * @type {Model}
 * @returns {Model} - The Mongoose model for the Order schema.
 */
exports.Order = mongoose.model('Order', orderSchema)
