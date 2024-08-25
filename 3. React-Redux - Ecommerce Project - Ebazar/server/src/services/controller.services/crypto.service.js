//hash password using crpto and craete token using jwt
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User } = require("../../model/user.model");
const httpStatus = require("http-status");
const { apiUtil, cryptoUtil, sanitizeUtil } = require("../../utils");
const { authService } = require("../auth.services/auth.service");

/**
 * Hashes the provided password and creates a JWT token for the user if the password matches.
 * Uses the `crypto.pbkdf2` function to hash the password and `jsonwebtoken` to create the token.
*
* @function
* @param {Object} user - The user object containing hashed password and salt.
* @param {string} password - The plain text password provided by the user.
* @param {Function} done - The callback function to handle the result of authentication.
* @returns {void}
* @throws {apiUtil.ApiError} - Throws an `apiUtil.ApiError` if an error occurs during hashing or token creation.
*/
const crytpoJwt = async function (user, password, done) {
    try {
        const hashedPassword = await cryptoUtil.hashPassword(password, user.salt)
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            done(null, false, { message: "Invalid credentials" });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            return done(null, { info: sanitizeUtil.santizeUser(user), token: token });
        }
    } catch (error) {
        throw new apiUtil.ApiError(error.status, error.message)
    }
}


/**
 * Creates a new user by hashing the provided password and storing the user details in the database.
 * Generates a salt and uses the `crypto.pbkdf2` function to hash the password before saving.
 *
 * @function
 * @param {Object} body - The user details including the plain text password.
 * @param {string} body.password - The plain text password to be hashed.
 * @param {Object} [body.rest] - Additional user details.
 * @returns {Promise<Object>} - Returns a promise that resolves to the newly created user object.
 * @throws {apiUtil.ApiError} - Throws an `apiUtil.ApiError` if an error occurs during user creation.
 */
const crytpoSignup = async function (body) {
    try {
        const { password, ...rest } = body
        const salt = crypto.randomBytes(16)
        const hashedPassword = await cryptoUtil.hashPassword(password, salt)
        const data = await authService.createUser(rest, hashedPassword, salt)
        return data
    } catch (error) {
        throw new apiUtil.ApiError(error.statusCode, error.message)
    }

}


/**
 * Resets the password for a user by hashing the new password and updating it in the database.
 * Generates a new salt and uses the `crypto.pbkdf2` function to hash the new password.
 *
 * @function
 * @param {string} id - The ID of the user whose password is to be reset.
 * @param {string} password - The new plain text password to be hashed.
 * @returns {Promise<void>} - Returns a promise that resolves when the password is successfully updated.
 * @throws {apiUtil.ApiError} - Throws an `apiUtil.ApiError` if an error occurs during password update.
 */
const crytpoReset = async function (id, password) {
    try {
        let salt = crypto.randomBytes(16)
        const hashedPassword = await cryptoUtil.hashPassword(password, salt)
        await User.findByIdAndUpdate(
            id,
            { password: hashedPassword, salt },
            { new: true }
        );
    } catch (error) {
        throw new apiUtil.ApiError(error.statusCode, error.message)
    }

}

module.exports.cryptoService = {
    crytpoJwt,
    crytpoSignup,
    crytpoReset

}