const express = require("express");
const productsRouter = require('./product.route')
const categoriesRouter = require('./category.route')
const brandsRouter = require('./brand.route')
const usersRouter = require('./user.route')
const cartRouter = require('./cart.route')
const wishListRouter = require('./wishlist.route')
const orderRouter = require('./order.route')
const authRouter = require('./auth.route')
const paymentRouter = require('./payment.route')
const { isAuthJwt } = require("../middlewares/auth.middleware");

const router = express.Router();
const protectedRouter = express.Router();

router.use('/auth', authRouter)
    .use('/payment', paymentRouter)
    .use(isAuthJwt, protectedRouter)

protectedRouter.use('/products', productsRouter)
    .use('/categories', categoriesRouter)
    .use('/brands', brandsRouter)
    .use('/users', usersRouter)
    .use('/cart', cartRouter)
    .use('/wishlist', wishListRouter)
    .use('/orders', orderRouter)


module.exports = router;