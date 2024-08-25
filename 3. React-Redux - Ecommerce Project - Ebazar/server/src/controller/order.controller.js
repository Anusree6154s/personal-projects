
const { Order } = require('../model/order.model.js');
const status = require('http-status');
const { catchAsyncUtil, apiUtil } = require("../utils/index.js");


/**
 * Controller to create a new order.
 * 
 * @function
 * @name createOrder
 * @memberof module:controller/order.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing the order data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the created order and status code 201 (Created)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.createOrder = catchAsyncUtil.catchAsync(async (req, res) => {
    const order = new Order(req.body);

    if (Object.keys(order._doc).length <= Object.keys(Order.schema.obj).length) {
        throw new apiUtil.ApiError(status.BAD_REQUEST, "Order details missing");
    }

    const data = await order.save();
    res.status(status.CREATED).json(data);
});


/**
 * Controller to fetch orders by a specific user.
 * 
 * @function
 * @name fetchOrdersByUser
 * @memberof module:controller/order.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters including `user` to filter orders by user
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the orders for the specified user and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.fetchOrdersByUser = catchAsyncUtil.catchAsync(async (req, res) => {
    const { user } = req.query;
    if (!user) {
        throw new apiUtil.ApiError(status.BAD_REQUEST, "User ID is required");
    }
    const data = await Order.find({ user: user });
    res.status(status.OK).json(data);
});


/**
 * Controller to delete an order by ID.
 * 
 * @function
 * @name deleteOrder
 * @memberof module:controller/order.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters including `id` of the order to delete
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the deleted order data and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.deleteOrder = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Order.findByIdAndDelete(id);
    if (!data) {
        throw new apiUtil.ApiError(status.NOT_FOUND, "Order not found");
    }
    res.status(status.OK).json(data);
});


/**
 * Controller to update an order by ID.
 * 
 * @function
 * @name updateOrder
 * @memberof module:controller/order.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters including `id` of the order to update
 * @param {Object} req.body - The request body containing the updated order data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the updated order data and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.updateOrder = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
        throw new apiUtil.ApiError(status.NOT_FOUND, "Order not found");
    }
    res.status(status.OK).json(data);
});


/**
 * Controller to fetch all orders with optional sorting and pagination.
 * 
 * @function
 * @name fetchAllOrders
 * @memberof module:controller/order.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for sorting and pagination:
 *   - `_sort` (optional): Field to sort by
 *   - `_order` (optional): Order of sorting, 'asc' or 'desc'
 *   - `_page` (optional): Page number for pagination
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with a list of all orders, optionally sorted and paginated, and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.fetchAllOrders = catchAsyncUtil.catchAsync(async (req, res) => {
    let orders = Order.find();

    if (req.query._sort && req.query._order) {
        orders = orders.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query._page) {
        const pageSize = 10;
        const page = req.query._page;
        orders = orders.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const data = await orders.exec();
    res.status(status.OK).json(data);
});
