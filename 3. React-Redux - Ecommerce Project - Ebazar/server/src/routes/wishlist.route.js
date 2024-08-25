const express = require('express')
const { fetchWishListByUser, addToWishList, deleteFromWishList, updateWishList } = require('../controller/wishlist.controller.js');

const router = express.Router()

router.post('/', addToWishList)
    .get('/', fetchWishListByUser)
    .delete('/:id', deleteFromWishList)


    module.exports = router