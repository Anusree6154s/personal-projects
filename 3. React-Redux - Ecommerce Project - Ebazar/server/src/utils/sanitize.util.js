/**
 * Sanitizes user data by extracting specific fields from the user object.
 * This function is used to ensure that only relevant user information is exposed.
 *
 * @function
 * @param {Object} user - The user object containing potentially sensitive information.
 * @param {string} user.id - The user's unique identifier.
 * @param {string} user.email - The user's email address.
 * @param {string} user.role - The user's role in the system.
 * @param {Array} user.addresses - The user's addresses.
 * @param {Object} user.address - The user's primary address.
 * @param {Array} user.orders - The user's orders.
 * @param {string} [user.name] - The user's name (optional).
 * @param {number} [user.phone] - The user's phone number (optional).
 * @param {Object} [user.image] - The user's profile image (optional).
 * @returns {Object} An object containing the sanitized user data.
 */
const sanitizeUser = (user) => {
    return {
        id: user.id,
        email: user.email,
        role: user.role,
        addresses: user.addresses,
        address: user.address,
        orders: user.orders,
        name: user.name,
        phone: user.phone,
        image: user.image,
    };
};

module.exports = { sanitizeUser }
