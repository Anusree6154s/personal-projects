portfolio website: https://portfolio-website-o12j.onrender.com

portfolio website: https://portfolio-website-o12j.onrender.com

- to  include in readme:

When creating JSDoc comments for functions, it's useful to follow a consistent blueprint to ensure that the documentation is clear, comprehensive, and helpful. Here’s a general blueprint you can follow:

### Blueprint for JSDoc Comments

1. **Function Description**:
   - Provide a concise description of what the function does. Explain the purpose and functionality.

2. **Function Name**:
   - Use the `@function` tag to specify the function name.

3. **Parameters**:
   - Use the `@param` tag to describe each parameter:
     - **Type**: The type of the parameter (e.g., `Object`, `string`, `number`).
     - **Name**: The name of the parameter.
     - **Description**: A description of what the parameter represents and any constraints or details.

4. **Returns**:
   - Use the `@returns` or `@return` tag to describe what the function returns:
     - **Type**: The type of the return value (e.g., `Promise<void>`, `Object`).
     - **Description**: A description of the return value and what it represents.

5. **Errors**:
   - Use the `@throws` tag to describe any errors or exceptions that the function might throw, including:
     - **Type of Error**: The type or name of the error (e.g., `ApiError`).
     - **Description**: Conditions under which the error is thrown.

6. **Example** (Optional):
   - Provide an example of how the function can be used if it adds value.

### Example JSDoc Comments

Here’s how you might use this blueprint to create JSDoc comments for your functions:

```js
const { Product } = require('../model/Product.js');
const catchAsync = require("../utils/catchAsync.util.js");
const status = require('http-status');
const ApiError = require('../utils/ApiError.util.js');

/**
 * Creates a new product.
 * 
 * @function
 * @name createProduct
 * @memberof module:controllers/productController
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The product data to be created.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with the created product and status code 201 (Created).
 * @throws {Error} Forwards any errors to the error-handling middleware.
 */
exports.createProduct = catchAsync(async (req, res) => {
    const product = new Product(req.body);
    const data = await product.save();
    res.status(status.CREATED).json(data);
});

/**
 * Fetches products based on query parameters for filtering, sorting, and pagination.
 * 
 * @function
 * @name fetchAllQuery
 * @memberof module:controllers/productController
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters for filtering and sorting:
 *   - `role` (optional): Role-based filtering (e.g., 'user' or 'admin').
 *   - `_sort` (optional): Field to sort by.
 *   - `_order` (optional): Sort order, 'asc' or 'desc'.
 *   - `category` (optional): Filter by category.
 *   - `brand` (optional): Filter by brand.
 *   - `_page` (optional): Page number for pagination.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with the filtered, sorted, and paginated list of products and status code 200 (OK).
 * @throws {Error} Forwards any errors to the error-handling middleware.
 */
exports.fetchAllQuery = catchAsync(async (req, res) => {
    let productQuery = null;

    // Filtering and sorting logic
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
 * Fetches a product by its ID.
 * 
 * @function
 * @name fetchProductsById
 * @memberof module:controllers/productController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - URL parameters including the `id` of the product.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with the product data and status code 200 (OK).
 * @throws {ApiError} Throws a 404 (Not Found) error if the product is not found.
 * @throws {Error} Forwards any other errors to the error-handling middleware.
 */
exports.fetchProductsById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) {
        throw new ApiError(status.NOT_FOUND, "Product not found");
    }
    res.status(status.OK).json(data);
});

/**
 * Updates a product by its ID with the data provided in the request body.
 * 
 * @function
 * @name updateProduct
 * @memberof module:controllers/productController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - URL parameters including the `id` of the product to update.
 * @param {Object} req.body - The updated product data.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with the updated product data and status code 200 (OK).
 * @throws {ApiError} Throws a 404 (Not Found) error if the product is not found.
 * @throws {Error} Forwards any other errors to the error-handling middleware.
 */
exports.updateProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
        throw new ApiError(status.NOT_FOUND, "Product not found");
    }
    res.status(status.OK).json(data);
});
```

### Summary of the Blueprint:

- **Function Description**: Provide a brief overview of what the function does.
- **Function Name**: Use `@function` and `@name` tags to specify the function's name and its purpose.
- **Parameters**: Use `@param` tags to document each parameter's type, name, and description.
- **Returns**: Use `@returns` or `@return` to describe what the function returns.
- **Errors**: Use `@throws` to document any errors that the function may throw and under what conditions.

This blueprint ensures that your JSDoc comments are thorough and consistent, making your code easier to understand and maintain.