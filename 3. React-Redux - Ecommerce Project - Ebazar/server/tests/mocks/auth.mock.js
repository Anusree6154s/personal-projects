jest.mock('../../src/utils/validation.util');
jest.mock('../../src/services/controller.services/crypto.service');
jest.mock('../../src/utils/sanitize.util');
jest.mock('jsonwebtoken');
jest.mock('../../src/model/user.model');
jest.mock('../../src/services/auth.services/auth.service');



let mockReqBody = { email: 'test@example.com', password: 'password123' }
let mockjwtToken = 'jwtToken'
let mockSanitzedUserResult = { email: mockReqBody.email }
let mockValidationResult = undefined;
let mockCryptoServiceResult = { ...mockReqBody, salt: 'salt' }
let mockReqUser = { token: mockjwtToken, info: mockSanitzedUserResult }

let reqMock = {
    body: mockReqBody,
    user: mockReqUser
}
let resMock = {
    statusCode: null,
    jsonData: null,
    cookies: {},

    status: jest.fn().mockImplementation(function (statusCode) {
        this.statusCode = statusCode;
        return this;
    }),

    json: jest.fn().mockImplementation(function (data) {
        this.jsonData = data;
        return this;
    }),

    cookie: jest.fn().mockImplementation(function (name, value, options) {
        this.cookies[name] = { value, options };
        return this;
    }),
}

let nextMock = jest.fn()


module.exports = {
    mockReqBody, reqMock, resMock, nextMock, mockValidationResult, mockCryptoServiceResult, mockSanitzedUserResult, mockjwtToken
}