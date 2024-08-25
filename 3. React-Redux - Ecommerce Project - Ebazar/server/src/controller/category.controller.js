const status = require('http-status');
const { Category } = require('../model/category.model.js');
const { catchAsyncUtil } = require("../utils/index.js");

/**
 * Controller to create a new category.
 * 
 * @function
 * @name createCategory
 * @memberof module:controller/category.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing the category data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the created category and status code 201 (Created)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.createCategory = catchAsyncUtil.catchAsync(async (req, res) => {
    const category = new Category(req.body);
    const data = await category.save();
    res.status(status.CREATED).json(data);
});


/**
 * Controller to fetch all categories.
 * 
 * @function
 * @name fetchCategories
 * @memberof module:controller/category.controller.js
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the list of categories and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.fetchCategories = catchAsyncUtil.catchAsync(async (req, res) => {
    const data = await Category.find().exec();
    res.status(status.OK).json(data);
});
