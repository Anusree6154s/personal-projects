jest.mock('../../src/model/brand.model');

const mockBrandData = { value: 'Test Brand', label:'test-brand' };
const mockSavedBrand = { id: '12345', ...mockBrandData };
let reqMock = {
    body:mockBrandData
}
let resMock = {
    statusCode: null,
    jsonData: null,

    status: jest.fn().mockImplementation(function (statusCode) {
        this.statusCode = statusCode;
        return this;
    }),

    json: jest.fn().mockImplementation(function (data) {
        this.jsonData = data;
        return this;
    })
}

let nextMock = jest.fn()


module.exports = {
    mockBrandData, reqMock, resMock, nextMock, mockSavedBrand
}