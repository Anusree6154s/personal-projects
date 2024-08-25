const express = require('express')
const { fetchCategories, createCategory } = require('../controller/category.controller.js');

const router = express.Router()

router.get('/', fetchCategories)
    .post('/', createCategory)

module.exports = router