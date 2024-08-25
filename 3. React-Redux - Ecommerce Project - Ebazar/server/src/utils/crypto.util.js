const crypto = require("crypto");


/**
 * Hashes a password using the PBKDF2 (Password-Based Key Derivation Function 2) algorithm.
 * This function derives a cryptographic key from the password and salt using a specified number of iterations,
 * key length, and digest algorithm.
 *
 * @function
 * @param {string} password - The password to be hashed.
 * @param {Buffer|string} salt - The salt to use for hashing. Can be a Buffer or a string.
 * @param {number} [iterations=310000] - The number of iterations to perform. Higher values increase security but also computational cost. Default is 310,000.
 * @param {number} [keylen=32] - The length of the derived key in bytes. Default is 32 bytes.
 * @param {string} [digest='sha256'] - The digest algorithm to use. Default is 'sha256'.
 * @returns {Buffer} The derived key as a Buffer.
 */
const hashPassword = (password, salt, iterations = 310000, keylen = 32, digest = "sha256") => {

    let data = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
    return data
};


module.exports = { hashPassword }