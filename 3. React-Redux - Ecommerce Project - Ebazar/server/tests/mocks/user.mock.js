// mockUtilities.js

// Mock for req object
function mockRequest({
    body = {},
    params = {},
    query = {},
    headers = {},
    user = {},
    method = 'GET',
}) {
    return {
        body,
        params,
        query,
        headers,
        user,
        method,
    };
}

// Mock for res object
function mockResponse() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    return res;
}

// Mock for next function
function mockNext() {
    return jest.fn();
}

module.exports = {
    mockRequest,
    mockResponse,
    mockNext,
};
