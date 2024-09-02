
const { Product } = require('../model/product.model.js');
const status = require('http-status');
const { catchAsyncUtil, apiUtil } = require('../utils/index.js');


/**
 * Controller to create a new product.
 * 
 * @function
 * @name createProduct
 * @memberof module:controller/product.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing the product data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the created product and status code 201 (Created)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.createProduct = catchAsyncUtil.catchAsync(async (req, res) => {
    const product = new Product(req.body);
    const data = await product.save();
    res.status(status.CREATED).json(data);
});


/**
 * Controller to fetch products based on query parameters.
 * 
 * @function
 * @name fetchAllQuery
 * @memberof module:controller/product.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering, sorting, and pagination:
 *   - `role` (optional): Filter products based on user or admin role
 *   - `_sort` (optional): Field to sort by
 *   - `_order` (optional): Order of sorting, 'asc' or 'desc'
 *   - `category` (optional): Filter products by category
 *   - `brand` (optional): Filter products by brand
 *   - `_page` (optional): Page number for pagination
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the filtered, sorted, and paginated list of products and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.fetchAllQuery = catchAsyncUtil.catchAsync(async (req, res) => {
    let productQuery = null;

    if (req.query.role === 'user') {
        productQuery = Product.find({ deleted: { $ne: true } });
    } else if (req.query.role === 'admin') {
        productQuery = Product.find();
    }
    if (req.query._sort && req.query._order) {
        productQuery = productQuery.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query.category) {
        const categories = req.query.category.includes(',') ? req.query.category.split(',') : req.query.category;
        productQuery = productQuery.find({ category: { $in: categories } });
    }
    if (req.query.brand) {
        const brands = req.query.brand.includes(',') ? req.query.brand.split(',') : req.query.brand;
        productQuery = productQuery.find({ brand: { $in: brands } });
    }
    if (req.query._page) {
        const pageSize = 10;
        const page = req.query._page;
        productQuery = productQuery.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const data = await productQuery.exec();
    res.status(status.OK).json(data);
});


/**
 * Controller to fetch a product by its ID.
 * 
 * @function
 * @name fetchProductsById
 * @memberof module:controller/product.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters including `id` of the product to fetch
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the product data and status code 200 (OK)
 * @throws {apiUtil.ApiError} Throws a 404 (Not Found) error if the product is not found
 * @throws {Error} Will forward any other errors to the error-handling middleware
 */
exports.fetchProductsById = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) {
        throw new apiUtil.ApiError(status.NOT_FOUND, "Product not found");
    }
    res.status(status.OK).json(data);
});


/**
 * Controller to update a product by its ID.
 * 
 * @function
 * @name updateProduct
 * @memberof module:controller/product.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters including `id` of the product to update
 * @param {Object} req.body - The request body containing the updated product data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the updated product data and status code 200 (OK)
 * @throws {apiUtil.ApiError} Throws a 404 (Not Found) error if the product is not found
 * @throws {Error} Will forward any other errors to the error-handling middleware
 */
exports.updateProduct = catchAsyncUtil.catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
        throw new apiUtil.ApiError(status.NOT_FOUND, "Product not found");
    }
    res.status(status.OK).json(data);
});
