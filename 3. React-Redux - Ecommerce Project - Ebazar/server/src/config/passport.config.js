/**
 * Passport authentication strategies module.
 * This module exports authentication strategies using `passport-local` and `passport-jwt`.
 * The strategies are used for local authentication via email/password and for token-based authentication via JWTs.
 * 
 * @module config/passport.config
 */

const { passportService } = require("../services");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;


/**
 * Local authentication strategy using email and password.
 * This strategy will authenticate users based on the `email` and `password` fields.
 *
 * @type {LocalStrategy}
 * @param {Object} optsLocal - Options for the LocalStrategy, such as fields and session handling.
 * @param {Function} verifyLocal - Verification function that checks user credentials. 
 * Takes `email`, `password`, and `done` callback as parameters.
 */
exports.localStrategy = new LocalStrategy(passportService.optsLocal, passportService.verifyLocal);


/**
 * JWT authentication strategy for token-based authentication.
 * This strategy will authenticate users by validating a JWT token provided in the request.
 *
 * @type {JwtStrategy}
 * @param {Object} optsJwt - Options for the JwtStrategy, such as secret key and token extraction method.
 * @param {Function} verifyJwt - Verification function that decodes the token and checks user identity.
 * Takes `jwt_payload` and `done` callback as parameters.
 */
exports.jwtStrategy = new JwtStrategy(passportService.optsJwt, passportService.verifyJwt);
