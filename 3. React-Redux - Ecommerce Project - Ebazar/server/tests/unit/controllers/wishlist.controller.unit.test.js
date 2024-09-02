const httpStatus = require("http-status");
const { apiUtil } = require("../../../src/utils");
const { WishList } = require("../../../src/model/wishlist.model");
const { addToWishList, deleteFromWishList, fetchWishListByUser } = require("../../../src/controller/wishlist.controller");
const { mockRequest, mockResponse, mockNext } = require('../../mocks/user.mock');
const mongoose = require('mongoose')

jest.mock('../../../src/model/wishlist.model');
jest.useFakeTimers()

describe('Wishlist Controller', () => {
    afterEach(() => {
        jest.clearAllTimers();
    })

    describe('addToWishlist', () => {

        test('should add a product to the wishlist and return the saved data', async () => {
            // Mock request, response, and next
            const req = mockRequest({
                body: { product: '609e9e3720f1b10cdcd03b88' },
            });
            const res = mockResponse();
            const next = mockNext();
        
            // Mocking mongoose.Types.ObjectId.isValid to return true
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
        
            // Mocking the saved wishlist data
            const mockWishlistData = {
                _id: '60ae9e3720f1b10cdcd03b89',
                product: {
                    _id: '609e9e3720f1b10cdcd03b88',
                    name: 'Sample Product',
                    price: 100,
                },
                populate: jest.fn().mockResolvedValue(),
            };
        
            // Mocking the WishList instance and save function
            WishList.prototype.save = jest.fn().mockResolvedValue(mockWishlistData);
        
            // Call the addToWishList function
            await addToWishList(req, res, next);
            await jest.runAllTimersAsync()
        
            // Assertions
            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(req.body.product);
            expect(WishList.prototype.save).toHaveBeenCalled();
            expect(mockWishlistData.populate).toHaveBeenCalledWith('product');
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith({
                _id: '60ae9e3720f1b10cdcd03b89',
                product: {
                    _id: '609e9e3720f1b10cdcd03b88',
                    name: 'Sample Product',
                    price: 100,
                },
                populate: expect.anything()
            });
            expect(next).not.toHaveBeenCalled();
        });

        test('should throw an error if the product ID is invalid', async () => {
            // Mock request, response, and next
            const req = mockRequest({
                body: { product: 'invalidProductId' },
            });
            const res = mockResponse();
            const next = mockNext();

            // Mocking isValid to return false
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

            // Call the addToWishList function
            await addToWishList(req, res, next);

            // Assertions
            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(req.body.product);
            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should call next with an error if there is an error during saving', async () => {
            // Mock request, response, and next
            const req = mockRequest({
                body: { product: '609e9e3720f1b10cdcd03b88' },
            });
            const res = mockResponse();
            const next = mockNext();

            // Mocking isValid to return true
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);

            // Mocking the save function to throw an error
            WishList.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

            // Call the addToWishList function
            await addToWishList(req, res, next);
            await jest.runAllTimersAsync()

            // Assertions
            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(req.body.product);
            expect(WishList.prototype.save).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

    });

    describe('fetchWishListByUser', () => {

        test('should fetch the wishlist for a user and return the data', async () => {
            // Mock request, response, and next
            const req = mockRequest({
                user: { id: 'userId123' },
            });
            const res = mockResponse();
            const next = mockNext();

            // Mocking the fetched wishlist data
            const mockWishlistData = [
                {
                    _id: 'wishlistId1',
                    product: {
                        _id: 'productId1',
                        name: 'Product 1',
                        price: 100,
                    },
                },
                {
                    _id: 'wishlistId2',
                    product: {
                        _id: 'productId2',
                        name: 'Product 2',
                        price: 200,
                    },
                },
            ];

            // Mocking the WishList find and populate methods
            WishList.find.mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockWishlistData),
            });

            // Call the fetchWishListByUser function
            await fetchWishListByUser(req, res, next);

            // Assertions
            expect(WishList.find).toHaveBeenCalledWith({ user: req.user.id });
            expect(WishList.find().populate).toHaveBeenCalledWith('product');
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockWishlistData);
            expect(next).not.toHaveBeenCalled();
        });

        test('should throw an error if the wishlist is empty', async () => {
            // Mock request, response, and next
            const req = mockRequest({
                user: { id: 'userId123' },
            });
            const res = mockResponse();
            const next = mockNext();

            // Mocking an empty wishlist
            const mockEmptyWishlist = [];

            // Mocking the WishList find and populate methods
            WishList.find.mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockEmptyWishlist),
            });

            // Call the fetchWishListByUser function
            await fetchWishListByUser(req, res, next);
            await jest.runAllTimersAsync()

            // Assertions
            expect(WishList.find).toHaveBeenCalledWith({ user: req.user.id });
            expect(WishList.find().populate).toHaveBeenCalledWith('product');
            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should handle errors properly during wishlist fetching', async () => {
            // Mock request, response, and next
            const req = mockRequest({
                user: { id: 'userId123' },
                method: 'GET',
            });
            const res = mockResponse();
            const next = mockNext();

            // Mocking an error during the find operation
            const mockError = new Error('Database error');
            // Return an object with a populate method for correct mock setup
            WishList.find.mockReturnValue({
                populate: jest.fn().mockRejectedValue(mockError), // Mock the populate method to throw an error
            });

            // Call the fetchWishListByUser function
            await fetchWishListByUser(req, res, next);
            await jest.runAllTimersAsync(); // Ensure all timers are cleared if using timers in your setup

            // Assertions
            expect(WishList.find).toHaveBeenCalledWith({ user: req.user.id });
            expect(WishList.find().populate).toHaveBeenCalledWith('product');
            expect(next).toHaveBeenCalledWith(mockError); // Check if next was called with the mockError
            expect(res.status).not.toHaveBeenCalled(); // Ensure response methods were not called
            expect(res.json).not.toHaveBeenCalled();
        });


    });

    describe('deleteFromWishList', () => {
        test('should delete a wishlist item and return success message', async () => {
            // Mock request, response, and next
            const req = mockRequest({ params: { id: 'wishlistId123' } });
            const res = mockResponse();
            const next = mockNext();

            // Mocking the deletion of wishlist item
            const mockDeletedItem = {
                _id: 'wishlistId123',
                product: {
                    _id: 'productId123',
                    name: 'Product 1',
                    price: 100,
                },
            };

            // Mock the WishList.findByIdAndDelete method
            WishList.findByIdAndDelete.mockResolvedValue(mockDeletedItem);

            // Call the deleteFromWishList function
            await deleteFromWishList(req, res, next);

            // Assertions
            expect(WishList.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith('Product deleted from wishlist.');
            expect(next).not.toHaveBeenCalled();
        });

        test('should throw an error if the wishlist item is not found', async () => {
            // Mock request, response, and next
            const req = mockRequest({ params: { id: 'wishlistId123' } });
            const res = mockResponse();
            const next = mockNext();

            // Mock the deletion method to return null (not found)
            WishList.findByIdAndDelete.mockResolvedValue(null);

            // Call the deleteFromWishList function
            await deleteFromWishList(req, res, next);
            await jest.runAllTimersAsync()

            // Assertions
            expect(WishList.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should call next with an error if there is an error during deletion', async () => {
            // Mock request, response, and next
            const req = mockRequest({ params: { id: 'wishlistId123' } });
            const res = mockResponse();
            const next = mockNext();

            // Mock the deletion method to throw an error
            WishList.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

            // Call the deleteFromWishList function
            await deleteFromWishList(req, res, next);
            await jest.runAllTimersAsync()

            // Assertions
            expect(WishList.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

    });
})