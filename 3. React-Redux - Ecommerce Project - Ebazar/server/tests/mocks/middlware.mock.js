// mockUtilities.js

const mockRequest = (overrides) => {
    return {
        ...overrides,
        body: {},
        params: {},
        query: {},
        headers: {},
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
};

const mockNext = () => jest.fn();

module.exports = { mockRequest, mockResponse, mockNext };
