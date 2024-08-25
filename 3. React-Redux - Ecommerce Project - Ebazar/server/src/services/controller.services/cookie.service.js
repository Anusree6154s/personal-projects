

/**
 * Extracts the JWT token from the cookies of the request object.
 * This function is used to retrieve the token used for authentication from the client's cookies.
 *
 * @function
 * @param {Object} req - The request object containing the cookies.
 * @param {Object} [req.cookies] - The cookies of the request.
 * @returns {string|null} The JWT token if present in the cookies, otherwise `null`.
 */
cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

module.exports.cookieService = { cookieExtractor }