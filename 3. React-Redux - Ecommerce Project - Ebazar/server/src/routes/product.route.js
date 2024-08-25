const express = require('express')
const { createProduct, fetchProductsById, updateProduct } = require('../controller/product.controller.js');
const { fetchAllQuery } = require('../controller/product.controller.js');

const router = express.Router()

router.post('/', createProduct)
    .get('/', fetchAllQuery)
    .get('/:id', fetchProductsById)
    .patch('/:id', updateProduct)

    module.exports = router