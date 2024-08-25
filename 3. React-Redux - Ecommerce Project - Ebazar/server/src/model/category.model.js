const mongoose = require('mongoose')
const { Schema } = mongoose;
const { modelsUtil } = require('../utils');

const categorySchema = new Schema({
    value: { type: String, required: true, unique: true },
    label: { type: String, required: true, unique: true },
    // checked: { type: Boolean, required: true },
})
modelsUtil.
createVirtualID(categorySchema)


/**
 * Mongoose model for the Category schema.
 * Defines the structure for a Category document with the following fields:
 * 
 * - `value` (String, required, unique): The category value, must be unique.
 * - `label` (String, required, unique): The category label, must be unique.
 * - `checked` (Boolean, optional): Indicates whether the category is checked (commented out in this schema).
 * 
 * @constant
 * @type {Model}
 * @returns {Model} - The Mongoose model for the Category schema.
 */
exports.Category = mongoose.model('Category', categorySchema)
