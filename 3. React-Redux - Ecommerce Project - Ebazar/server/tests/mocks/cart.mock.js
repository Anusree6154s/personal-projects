jest.mock("../../src/model/cart.model");
// jest.mock("mongoose");

const mockCartData = {
    product: "productId",
    quantity: 1
}
const mockSavedCart = { id: '12345', ...mockCartData };
let reqMock = {
    body:mockCartData,
    user: { id: 'user123' }
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


module.exports = {
    mockCartData, reqMock, resMock, mockSavedCart
}