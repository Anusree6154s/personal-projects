/**
 * Adds a virtual 'id' property to a Mongoose schema and configures the schema to include this virtual property
 * in JSON responses while excluding the default `_id` property.
 *
 * @function
 * @param {Schema} schema - The Mongoose schema to be modified.
 * @returns {void}
 */
function createVirtualID(schema) {
    // Add a virtual 'id' property
    schema.virtual('id').get(function () { this._id });

    // Set virtual id to JSON response
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        }
    });
}

module.exports = { createVirtualID }