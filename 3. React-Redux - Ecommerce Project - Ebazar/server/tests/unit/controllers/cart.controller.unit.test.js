const { reqMock, resMock } = require("../../mocks/cart.mock");

const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require("../../../src/controller/cart.controller");
const httpStatus = require("http-status");
const { Cart } = require("../../../src/model/cart.model");
const { apiUtil } = require("../../../src/utils");
const { ApiError } = require("../../../src/utils/ApiError.util");
const mongoose = require("mongoose");

jest.useFakeTimers()

describe('Cart Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = reqMock
        res = { ...resMock }
        next = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
        jest.clearAllTimers();
    })

    describe("addToCart", () => {
        test("should add a new item to the cart and return it in the response", async () => {
            const mockCartData = {
                product: "12fh3847563f78b6tgt4",
                quantity: 1,
                populate: jest.fn().mockResolvedValue()
            };
            Cart.prototype.save.mockReturnValue(mockCartData);

            await addToCart(req, res, next);

            await jest.runAllTimersAsync();

            expect(Cart).toHaveBeenCalledWith(req.body);
            expect(mockCartData.populate).toHaveBeenCalledWith('product');

            expect(res.statusCode).toBe(httpStatus.CREATED);
            expect(res.jsonData).toBe(mockCartData);
        });

        test("should handle errors when adding to the cart fails", async () => {
            const error = new Error("Save failed");
            Cart.prototype.save.mockImplementation(() => {
                throw error
            });

            await addToCart(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.statusCode).toBe(null);
            expect(res.jsonData).toBe(null);
        });
    });

    describe('fetchCartByUser', () => {

        test('should fetch cart items for the user and return them in the response', async () => {
            const mockCartData = [{ product: "product1" }, { product: "product2" }];

            const mockQuery = {
                populate: jest.fn().mockResolvedValue(mockCartData),
            };

            Cart.find = jest.fn().mockReturnValue(mockQuery);

            await fetchCartByUser(req, res, next);

            expect(Cart.find).toHaveBeenCalledWith({ user: req.user.id });
            expect(mockQuery.populate).toHaveBeenCalledWith("product");
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockCartData);
            expect(next).not.toHaveBeenCalled();
        });

        test('should handle case when no cart items are found for the user', async () => {
            const mockQuery = {
                populate: jest.fn().mockResolvedValue()
            };

            Cart.find = jest.fn().mockReturnValue(mockQuery);

            await fetchCartByUser(req, res, next)

            await jest.runAllTimersAsync();

            expect(Cart.find).toHaveBeenCalledWith({ user: req.user.id });
            expect(mockQuery.populate).toHaveBeenCalledWith("product");

            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(next.mock.calls[0][0]).toMatchObject({
                statusCode: httpStatus.NOT_FOUND,
                message: "No items in cart.",
            });
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should handle errors during the fetch process', async () => {
            const error = new Error('Database error');

            // Mock the find method to return a query object with a populate method
            const mockQuery = {
                populate: jest.fn().mockImplementation(() => {
                    throw error; // Simulate the error during population
                }),
            };

            Cart.find = jest.fn().mockReturnValue(mockQuery);

            await fetchCartByUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('deleteFromCart', () => {
        beforeEach(() => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
            req.params = { id: '123456' }
        })

        afterEach(() => {
            jest.clearAllTimers();
        })

        test('should delete the cart item and return it in the response', async () => {
            const mockCartData = { id: 'validObjectId', product: 'product1' };
            Cart.findByIdAndDelete.mockResolvedValue(mockCartData);

            await deleteFromCart(req, res, next);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(req.params.id);
            expect(Cart.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockCartData);
            expect(next).not.toHaveBeenCalled();
        });

        test('should return an error if the cart item ID is invalid', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

            await deleteFromCart(req, res, next);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(req.params.id);
            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(next.mock.calls[0][0]).toMatchObject({
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Invalid cart item ID'
            });
            expect(Cart.findByIdAndDelete).not.toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should return an error if the cart item is not found', async () => {
            Cart.findByIdAndDelete.mockResolvedValue(null);

            await deleteFromCart(req, res, next);

            await jest.runAllTimersAsync();

            expect(Cart.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(next.mock.calls[0][0]).toMatchObject({
                statusCode: httpStatus.NOT_FOUND,
                message: 'Empty cart'
            });
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should handle errors during the deletion process', async () => {
            const error = new Error('Database error');
            Cart.findByIdAndDelete.mockRejectedValue(error);

            await deleteFromCart(req, res, next);

            await jest.runAllTimersAsync();

            expect(Cart.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('updateCart', () => {
        beforeEach(()=>{
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
        })

        test('should successfully update a cart item and return it in the response', async () => {
            const mockCartData = { product: 'productId', quantity: 5 };
            const mockUpdatedCart = { ...mockCartData, populate: jest.fn().mockResolvedValue(mockCartData) };

            
            Cart.findByIdAndUpdate.mockResolvedValue(mockUpdatedCart);

            req.params = { id: 'validId' };
            req.body = { quantity: 5 };

            await updateCart(req, res, next);

            await jest.runAllTimersAsync();

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('validId');
            expect(Cart.findByIdAndUpdate).toHaveBeenCalledWith('validId', { quantity: 5 }, { new: true });
            expect(mockUpdatedCart.populate).toHaveBeenCalledWith('product');
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockUpdatedCart);
            expect(next).not.toHaveBeenCalled();
        });

        test('should handle invalid cart item ID', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

            req.params = { id: 'invalidId' };

            await updateCart(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(next.mock.calls[0][0]).toMatchObject({
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Invalid cart item ID'
            });
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should handle case where no update data is provided', async () => {
            req.params = { id: 'validId' };
            req.body = {}; // No update data

            await updateCart(req, res, next);
            await jest.runAllTimersAsync();

            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(next.mock.calls[0][0]).toMatchObject({
                statusCode: httpStatus.BAD_REQUEST,
                message: 'No update item provided'
            });
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should handle case where the cart item does not exist', async () => {
            Cart.findByIdAndUpdate.mockResolvedValue(null);

            req.params.id = 'validId';
            req.body = { quantity: 5 };

            await updateCart(req, res, next);

            await jest.runAllTimersAsync();

            expect(Cart.findByIdAndUpdate).toHaveBeenCalledWith('validId', { quantity: 5 }, { new: true });
            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(next.mock.calls[0][0]).toMatchObject({
                statusCode: httpStatus.NOT_FOUND,
                message: 'Cart item does not exist'
            });
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
})