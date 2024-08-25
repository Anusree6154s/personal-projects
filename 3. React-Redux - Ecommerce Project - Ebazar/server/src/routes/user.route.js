const express = require('express')
const { fetchUserById, updateUser} = require('../controller/user.controller.js');

const router = express.Router()

router.get('/user', fetchUserById)
    .patch('/user/:id', updateUser)


    module.exports = router