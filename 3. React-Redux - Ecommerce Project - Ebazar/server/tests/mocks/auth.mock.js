const { cryptoService } = require("../../src/services/controller.services/crypto.service");
const { sanitizeUtil } = require("../../src/utils");
const { dbDataOne } = require("../fixtures/user.fixtures");
const jwt = require("jsonwebtoken");

const validate = jest.fn().mockImplementation((input, schema) =>
    input.email && input.password && schema === validateSignup ? true : false
);

cryptoService.crytpoSignup = jest.fn().mockImplementation((body) => { return { ...dbDataOne } });

sanitizeUtil.santizeUser = jest.fn().mockImplementation((body) => {
    const { password, salt, ...sanitizedData } = dbDataOne;
    return sanitizedData
});

jwt.sign = jest.fn().mockImplementation((body, secret) => {
    const { password, salt, ...sanitizedData } = dbDataOne;
    return sanitizedData
});

module.exports = {
    validate
}