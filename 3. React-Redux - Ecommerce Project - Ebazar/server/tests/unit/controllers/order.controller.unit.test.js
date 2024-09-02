const httpStatus = require("http-status");
const { Order } = require("../../../src/model/order.model");
const { createOrder, deleteOrder, updateOrder, fetchAllOrders } = require("../../../src/controller/order.controller");
const { apiUtil } = require("../../../src/utils");

jest.mock('../../../src/model/order.model');
jest.useFakeTimers()

describe('Order Controller', () => {
    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks()
    })

    describe('createOrder', () => {
        test('should create order successfully', async () => {
            // Mock the schema to have fewer keys than the _doc
            Order.schema = {
                obj: {
                    item: String,
                    quantity: Number,
                    price: Number
                }
            };

            // Mock the _doc property to have at least 10 keys
            const mockOrder = {
                _doc: {
                    item: 'Laptop',
                    quantity: 1,
                    price: 1000,
                    customerName: 'John Doe',
                    shippingAddress: '123 Main St'
                },
                save: jest.fn().mockResolvedValue({
                    _id: '1',
                    ...{
                        item: 'Laptop',
                        quantity: 1,
                        price: 1000,
                        customerName: 'John Doe',
                        shippingAddress: '123 Main St'
                    }
                })
            };

            // Mock the Order constructor to return the mockOrder instance
            const mockOrderData = { item: 'Laptop', quantity: 1, price: 1000 };
            Order.mockImplementation(() => mockOrder);

            // Create mocks for req, res, and next
            const req = { body: mockOrderData };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            await createOrder(req, res, next);
            // await jest.runAllTimersAsync();

            expect(Order).toHaveBeenCalledWith(mockOrderData);
            expect(mockOrder.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith({
                _id: '1',
                ...mockOrder._doc
            });
            expect(next).not.toHaveBeenCalled();
        });

        test('should handle missing order details', async () => {
            Order.schema = {
                obj: {
                    item: String,
                    quantity: Number,
                    price: Number,
                    customerName: String,
                    shippingAddress: String
                }
            };

            // Mock the _doc property to have at least 10 keys
            const mockOrder = {
                _doc: {
                    item: 'Laptop',
                    quantity: 1,
                    price: 1000
                },
                save: jest.fn().mockResolvedValue({
                    _id: '1',
                    ...{
                        item: 'Laptop',
                        quantity: 1,
                        price: 1000,
                        customerName: 'John Doe',
                        shippingAddress: '123 Main St'
                    }
                })
            };

            // Mock the Order constructor to return the mockOrder instance
            const mockOrderData = { item: 'Laptop', quantity: 1, price: 1000 };
            Order.mockImplementation(() => mockOrder);

            // Create mocks for req, res, and next
            const req = { body: mockOrderData };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            await createOrder(req, res, next);
            await jest.runAllTimersAsync();

            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: httpStatus.BAD_REQUEST,
                    message: "Order details missing"
                })
            );
        });
    })

    describe('deleteOrder', () => {
        test('should delete order successfully', async () => {
            const mockOrder = { _id: '1', item: 'Laptop', quantity: 1, user: 'user1' };

            // Mock the findByIdAndDelete method to resolve with mockOrder
            Order.findByIdAndDelete = jest.fn().mockResolvedValue(mockOrder);

            // Create mocks for req, res, and next
            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            // Call the function with mocks
            await deleteOrder(req, res, next);

            // Assertions
            expect(Order.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockOrder);
            expect(next).not.toHaveBeenCalled();
        });

        test('should handle case where order does not exist', async () => {
            const mockError = new apiUtil.ApiError(httpStatus.NOT_FOUND, 'Order not found');

            // Mock the findByIdAndDelete method to resolve with null
            Order.findByIdAndDelete = jest.fn().mockResolvedValue(null);

            // Create mocks for req, res, and next
            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            // Call the function with mocks
            await deleteOrder(req, res, next)
            await jest.runAllTimersAsync();
            // await expect(deleteOrder(req, res, next)).rejects.toThrow(mockError);

            // Assertions
            expect(Order.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    })

    describe('updateOrder', () => {
        test('should update order successfully', async () => {
            const mockOrder = { _id: '1', item: 'Laptop', quantity: 1, user: 'user1' };
            const updatedOrder = { ...mockOrder, quantity: 2 }; // Updated order details

            // Mock the findByIdAndUpdate method to resolve with updatedOrder
            Order.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedOrder);

            // Create mocks for req, res, and next
            const req = { params: { id: '1' }, body: { quantity: 2 } };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            // Call the function with mocks
            await updateOrder(req, res, next);

            // Assertions
            expect(Order.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(updatedOrder);
            expect(next).not.toHaveBeenCalled();
        });

        test('should handle case where order is not found', async () => {
            const mockError = new apiUtil.ApiError(httpStatus.NOT_FOUND, 'Order not found');

            // Mock the findByIdAndUpdate method to resolve with null
            Order.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

            // Create mocks for req, res, and next
            const req = { params: { id: '1' }, body: { quantity: 2 } };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            await updateOrder(req, res, next)
            await jest.runAllTimersAsync();
            // await expect(updateOrder(req, res, next)).rejects.toThrow(mockError);

            // Assertions
            expect(Order.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    })

    describe('fetchAllOrders', ()=>{
        test('should fetch all orders without query parameters', async () => {
            const mockOrders = [
                { _id: '1', item: 'Laptop', quantity: 1, user: 'user1' },
                { _id: '2', item: 'Phone', quantity: 2, user: 'user2' }
            ];

            // Mock the find method to resolve with mockOrders
            Order.find = jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockOrders)
            });

            // Create mocks for req, res, and next
            const req = { query: {} };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            // Call the function with mocks
            await fetchAllOrders(req, res, next);

            // Assertions
            expect(Order.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockOrders);
            expect(next).not.toHaveBeenCalled();
        });

        test('should fetch all orders with sorting', async () => {
            const mockOrders = [
                { _id: '2', item: 'Phone', quantity: 2, user: 'user2' },
                { _id: '1', item: 'Laptop', quantity: 1, user: 'user1' }
            ];

            // Mock the find method to return a mock query object
            Order.find = jest.fn().mockReturnValue({
                sort: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockOrders)
            });

            // Create mocks for req, res, and next
            const req = { query: { _sort: 'item', _order: 'desc' } };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            // Call the function with mocks
            await fetchAllOrders(req, res, next);

            // Assertions
            expect(Order.find).toHaveBeenCalled();
            expect(Order.find().sort).toHaveBeenCalledWith({ item: 'desc' });
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockOrders);
            expect(next).not.toHaveBeenCalled();
        });

        test('should fetch all orders with pagination', async () => {
            const mockOrders = [
                { _id: '1', item: 'Laptop', quantity: 1, user: 'user1' }
            ];

            // Mock the find method to return a mock query object
            Order.find = jest.fn().mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockOrders)
            });

            // Create mocks for req, res, and next
            const req = { query: { _page: '2' } };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            // Call the function with mocks
            await fetchAllOrders(req, res, next);

            // Assertions
            expect(Order.find).toHaveBeenCalled();
            expect(Order.find().skip).toHaveBeenCalledWith(10); // Page size of 10 and page 2
            expect(Order.find().limit).toHaveBeenCalledWith(10);
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockOrders);
            expect(next).not.toHaveBeenCalled();
        });

        test('should fetch all orders with sorting and pagination', async () => {
            const mockOrders = [
                { _id: '1', item: 'Laptop', quantity: 1, user: 'user1' },
                { _id: '2', item: 'Phone', quantity: 2, user: 'user2' }
            ];

            // Mock the find method to return a mock query object
            Order.find = jest.fn().mockReturnValue({
                sort: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockOrders)
            });

            // Create mocks for req, res, and next
            const req = { query: { _sort: 'item', _order: 'asc', _page: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(), // Mock chainable methods
                json: jest.fn()
            };
            const next = jest.fn();

            // Call the function with mocks
            await fetchAllOrders(req, res, next);

            // Assertions
            expect(Order.find).toHaveBeenCalled();
            expect(Order.find().sort).toHaveBeenCalledWith({ item: 'asc' });
            expect(Order.find().skip).toHaveBeenCalledWith(0); // Page size of 10 and page 1
            expect(Order.find().limit).toHaveBeenCalledWith(10);
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockOrders);
            expect(next).not.toHaveBeenCalled();
        });
    })
})