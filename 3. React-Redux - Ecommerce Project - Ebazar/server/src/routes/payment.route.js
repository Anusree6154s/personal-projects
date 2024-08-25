const express = require('express')
const { createPaymentIntentCallback, webhookCallback } = require('../controller/payment.controller.js');

const router = express.Router()

router.post("/create-payment-intent", createPaymentIntentCallback)
    // .post('/webhook', express.raw({ type: 'application/json' }), webhookCallback)



    module.exports = router