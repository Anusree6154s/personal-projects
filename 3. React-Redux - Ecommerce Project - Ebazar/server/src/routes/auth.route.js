const express = require('express')
const { createUser, loginUser, checkAuth, resetPassword, sendOTP, logoutUser } = require('../controller/auth.controller.js');
const { isAuthJwt, isAuthLocal } = require('../middlewares/auth.middleware.js');

const router = express.Router()

router.post('/signup', createUser)
    .post('/sendOTP', sendOTP)
    .patch('/resetpassword/:id', resetPassword)
    .post('/login', isAuthLocal, loginUser)
    .get('/check', isAuthJwt, checkAuth)
    .get('/logout', logoutUser)


module.exports = router