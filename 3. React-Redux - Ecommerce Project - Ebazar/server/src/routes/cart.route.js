const express = require('express')
const { fetchCartByUser, addToCart, deleteFromCart, updateCart } = require('../controller/cart.controller.js');

const router = express.Router()

router.post('/', addToCart)
    .get('/', fetchCartByUser)
    .delete('/:id', deleteFromCart)
    .patch('/:id', updateCart)


    module.exports = router