
const request = require('supertest');
const setupTestDB = require('../utils/setupDB.js');
const server = require('../../src/server.js');
const { deleteUsers, insertUsers, dbDataOne } = require('../fixtures/user.fixtures.js');
const { product1, insertProducts, deleteProducts } = require('../fixtures/product.fixture.js')
const jwt = require('jsonwebtoken');
const { env } = require('../config/env.config.js');
const { insertCart, deleteCart } = require('../fixtures/cart.fixtures.js');
const httpStatus = require('http-status');
const { Cart } = require('../../src/model/cart.model.js');

setupTestDB();

describe("Cart routes", () => {
    let token;
    let userId;
    let productId;
    let cart;
    beforeAll(async () => {
        // create a user and use its _id to create a jwt token
        const data = await insertUsers(dbDataOne)
        userId = data._id.toString()

        token = jwt.sign({ id: data._id, ...data }, env.jwt.secret_key)

        const product = await insertProducts([product1])
        productId = product[0]._id.toString()

        cart = {
            user: userId,
            product: productId,
            quantity: 2
        }
    })

    afterAll(async () => {
        await deleteUsers();
        await deleteProducts()
    });


    describe('POST /api/cart', () => {
        beforeAll(async () => {
            await deleteCart()
        });

        test('should add a product to the cart and return the cart object with populated product field', async () => {
            const res = await request(server)
                .post('/api/cart')
                .set('Cookie', [`jwt=${token}`])
                .send(cart)
                .expect('Content-Type', /json/)
                .expect(201);

            // Check if the response contains the correct cart data
            expect(res.body).toHaveProperty('id');
            expect(res.body.product).toHaveProperty('title', 'Sample Product 1');
            expect(res.body).toHaveProperty('quantity', 2);
        });
    })

    describe('GET /api/cart', () => {
        beforeAll(async () => {
            await deleteCart()
        });

        beforeEach(async () => {
            await insertCart(cart)
        });

        test('should return the cart items for the user', async () => {
            const res = await request(server)
                .get('/api/cart')
                .set('Cookie', [`jwt=${token}`])
                .expect(httpStatus.OK);

            expect(res.body).toBeDefined();
            expect(res.body.length).toBe(1);
            expect(res.body[0].product.title).toBe('Sample Product 1');
            expect(res.body[0].quantity).toBe(2);
        });

        test('should return a 401 if the user is not authenticated', async () => {
            const res = await request(server)
                .get('/api/cart')
                .expect(httpStatus.UNAUTHORIZED);

            expect(res.body.error).toBe('Authentication Failed');
        });
    });

    describe('DELETE /api/cart/:id', () => {
        let cartItemId
        beforeEach(async () => {
            // Create a cart item to delete
            const cartItem = await insertCart(cart)
            cartItemId = cartItem._id.toString();
        });

        beforeAll(async () => {
            await deleteCart()
        });

        test('should delete the cart item and return the deleted item', async () => {
            const res = await request(server)
                .delete(`/api/cart/${cartItemId}`)
                .set('Cookie', [`jwt=${token}`])
                .expect(200);

            expect(res.body).toHaveProperty('id', cartItemId);

            const cartItemInDb = await Cart.findById(cartItemId);
            expect(cartItemInDb).toBeNull();
        });

        test('should return 404 if the cart item does not exist', async () => {
            const fakeId = '612c88e3798e4e3b5c77b3c6'; 

            const res = await request(server)
                .delete(`/api/cart/${fakeId}`)
                .set('Cookie', [`jwt=${token}`])
                .expect(404);

            expect(res.body.error).toMatch(/empty cart/i);
        });

        test('should return 400 if the cart item ID is invalid', async () => {
            const invalidId = '123';

            const res = await request(server)
                .delete(`/api/cart/${invalidId}`)
                .set('Cookie', [`jwt=${token}`])
                .expect(400);

            expect(res.body.error).toMatch(/invalid/i);
        });
    });

    describe('PATCH /api/cart/:id', () => {
        let cartItemId
        beforeEach(async () => {
            // Create a cart item to update
            const cartItem = await insertCart(cart)
            cartItemId = cartItem._id.toString();
        });

        beforeAll(async () => {
            await deleteCart()
        });

    
        test('should update the cart item and return the updated item', async () => {
            const updateData = { quantity: 5 };
    
            const res = await request(server)
                .patch(`/api/cart/${cartItemId}`)
                .set('Cookie', [`jwt=${token}`])
                .send(updateData)
                .expect(200);
    
            expect(res.body).toHaveProperty('id', cartItemId);
            expect(res.body).toHaveProperty('quantity', 5);
    
            const cartItemInDb = await Cart.findById(cartItemId);
            expect(cartItemInDb.quantity).toBe(5);
        });
    
        test('should return 404 if the cart item does not exist', async () => {
            const fakeId = '612c88e3798e4e3b5c77b3c6'; // Use a valid but non-existing ObjectId
            const updateData = { quantity: 5 };
    
            const res = await request(server)
                .patch(`/api/cart/${fakeId}`)
                .set('Cookie', [`jwt=${token}`])
                .send(updateData)
                .expect(404);
    
            expect(res.body.error).toMatch(/cart item does not exist/i);
        });
    
        test('should return 400 if the cart item ID is invalid', async () => {
            const invalidId = '123';
            const updateData = { quantity: 5 };
    
            const res = await request(server)
                .patch(`/api/cart/${invalidId}`)
                .set('Cookie', [`jwt=${token}`])
                .send(updateData)
                .expect(400);
    
            expect(res.body.error).toMatch(/invalid/i);
        });
    
        test('should return 400 if no update data is provided', async () => {
            const res = await request(server)
                .patch(`/api/cart/${cartItemId}`)
                .set('Cookie', [`jwt=${token}`])
                .send({})
                .expect(400);
    
            expect(res.body.error).toMatch(/No update item provided/i);
        });
    });
})