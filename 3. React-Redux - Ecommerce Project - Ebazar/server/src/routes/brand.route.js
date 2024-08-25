const express = require('express')
const { fetchBrands, createBrand } = require('../controller/brand.controller.js');

const router = express.Router()

router.get('/', fetchBrands)
    .post('/', createBrand)


module.exports = router