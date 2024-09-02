
const status = require('http-status')
const { catchAsyncUtil } = require("../utils/index.js");
const { Brand } = require('../model/brand.model')


/**
 * Controller to create a new brand.
 * 
 * @function
 * @name createBrand
 * @memberof module:controller/brand.controller.js
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body containing the brand data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the created brand and status code 201 (Created)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.createBrand = catchAsyncUtil.catchAsync(async (req, res) => {
    const brand = new Brand(req.body)
    const data = await brand.save(req.body)
    res.status(status.CREATED).json(data)
})

/**
 * Controller to fetch all brands.
 * 
 * @function
 * @name fetchBrands
 * @memberof module:controller/brand.controller.js
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with the list of all brands and status code 200 (OK)
 * @throws {Error} Will forward any errors to the error-handling middleware
 */
exports.fetchBrands = catchAsyncUtil.catchAsync(async (req, res) => {
    const data = await Brand.find().exec()
    res.status(status.OK).json(data)
})