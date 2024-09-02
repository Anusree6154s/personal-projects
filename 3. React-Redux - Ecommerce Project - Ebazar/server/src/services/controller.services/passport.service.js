const { User } = require("../../model/user.model.js");
const { env } = require("../../config/env.config.js");
const { cryptoService, cookieService } = require("../index.js");
const { sanitizeUtil } = require("../../utils/index.js");


/**
 * Options for the JWT strategy used by Passport.js.
 * Configures how the JWT is extracted from requests and the secret key used for verification.
 *
 * @constant
 * @type {Object}
 * @property {Function} jwtFromRequest - Function to extract the JWT from the request.
 * @property {string} secretOrKey - Secret key used for JWT verification.
 */
const optsJwt = {
    jwtFromRequest: cookieService.cookieExtractor,
    secretOrKey: env.jwt.secret_key
}

/**
 * JWT strategy verification function used by Passport.js to validate JWT tokens.
 * Checks if the JWT payload contains a valid user ID and retrieves the user from the database.
 *
 * @function
 * @param {Object} jwt_payload - The decoded JWT payload containing user information.
 * @param {Function} done - The callback function to handle the result of authentication.
 * @returns {void}
 * @throws {Error} - Throws an error if there is a problem with the database query.
 */
const verifyJwt = async function (jwt_payload, done) {
    if (!jwt_payload.id) return done(null, false);

    try {
        let user = await User.findOne({ _id: jwt_payload.id });

        if (user) return done(null, sanitizeUtil.sanitizeUser(user));
        else return done(null, false);

    } catch (error) {
        return done(error, false);
    }
}

/**
 * Options for the Local strategy used by Passport.js.
 * Configures which field in the request body will be used for the username during authentication.
 *
 * @constant
 * @type {Object}
 * @property {string} usernameField - The field in the request body that contains the username (email).
 */
const optsLocal = { usernameField: "email" }

/**
 * Local strategy verification function used by Passport.js to authenticate users using email and password.
 * Retrieves the user by email and checks the provided password against the stored hash.
 *
 * @function
 * @param {string} email - The email of the user trying to log in.
 * @param {string} password - The password provided by the user.
 * @param {Function} done - The callback function to handle the result of authentication.
 * @returns {void}
 * @throws {Error} - Throws an error if there is a problem with the database query.
 */
const verifyLocal = async function (email, password, done) {
    try {
        const user = await User.findOne({ email: email }).exec();

        if (!user) {
            return done(null, false, { message: "No such user email" });
        }

        cryptoService.crytpoJwt(user, password, done);

    } catch (error) {
        return done(error);
    }
}


module.exports = { optsJwt, verifyJwt, optsLocal, verifyLocal }