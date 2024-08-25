
const request = require('supertest');
const setupTestDB = require('../utils/setupDB.js');
const server = require('../../src/server.js');
const { deleteUsers, insertUsers, dbDataOne } = require('../fixtures/user.fixtures.js');
const { product1, insertProducts, deleteProducts, product2 } = require('../fixtures/product.fixture.js')
const jwt = require('jsonwebtoken');
const { env } = require('../config/env.config.js');
const { Order } = require('../../src/model/order.model.js');
const { deleteWishlist, insertWishlist } = require('../fixtures/wishlist.fixtures.js');
const httpStatus = require('http-status');
const { deleteOrders, getOrder, insertOrders } = require('../fixtures/order.fixtures.js');

setupTestDB();

describe("Order routes", () => {
    let token;
    let userId;
    let productId;
    let order1, order2;
    beforeAll(async () => {
        // create a user and use its _id to create a jwt token
        const data = await insertUsers(dbDataOne)
        userId = data._id.toString()

        token = jwt.sign({ id: data._id, ...data }, env.jwt.secret_key)

        let product = await insertProducts([product1])
        productId = product[0]._id.toString()

        order1 = getOrder(userId, productId, 200)

        product = await insertProducts([product2])
        productId = product[0]._id.toString()

        order2 = getOrder(userId, productId, 100)
    })

    afterAll(async () => {
        await deleteUsers();
        await deleteProducts()
    });

    describe('POST /api/orders', () => {

        afterAll(async () => {
            await deleteOrders();
        });

        test('should create an order successfully', async () => {
            const res = await request(server)
                .post('/api/orders')
                .set('Cookie', [`jwt=${token}`])
                .send(order1);

            expect(res.status).toBe(httpStatus.CREATED);
            expect(res.body).toHaveProperty('id');
            expect(res.body.total).toBe(order1.total);
            expect(res.body.status).toBe('Pending');

            const savedOrder = await Order.findById(res.body.id);
            expect(savedOrder).not.toBeNull();
            expect(savedOrder.total).toBe(order1.total);
        });

        test('should return 400 if required fields are missing', async () => {
            const orderClone = { ...order1 }
            delete orderClone.totalPrice

            const res = await request(server)
                .post('/api/orders')
                .set('Cookie', [`jwt=${token}`])
                .send(orderClone);

            expect(res.status).toBe(httpStatus.BAD_REQUEST); // Adjust based on your validation
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('GET /api/orders', () => {
        beforeAll(async () => {
            await insertOrders([order1, order2]);
        });

        afterAll(async () => {
            await deleteOrders();
        });

        test('should fetch orders for a specific user', async () => {
            const res = await request(server)
                .get('/api/orders')
                .set('Cookie', [`jwt=${token}`])
                .query({ user: userId });

            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toHaveLength(2);
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0].user).toBe(userId);
            expect(res.body[1].user).toBe(userId);
        });

        test('should return an empty array if the user has no orders', async () => {
            const anotherUserId = '605c72ef1f2a2b001e8d6c6d'

            const res = await request(server)
                .get('/api/orders')
                .set('Cookie', [`jwt=${token}`])
                .query({ user: anotherUserId });

            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toHaveLength(0); // No orders for this user
        });

        test('should return 400 if user ID is not provided', async () => {
            const res = await request(server)
                .get('/api/orders')
                .set('Cookie', [`jwt=${token}`])
                .query({}); // No user ID provided

            expect(res.status).toBe(httpStatus.BAD_REQUEST);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('DELETE /api/orders/:id', () => {
        let orderId;

        beforeAll(async () => {
            const order = await insertOrders([order1]);
            orderId = order[0]._id.toString()
        });

        afterAll(async () => {
            await deleteOrders();
        });

        test('should delete an order and return the deleted order data', async () => {
            const res = await request(server)
                .delete(`/api/orders/${orderId}`)
                .set('Cookie', [`jwt=${token}`])
                .send();

            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toHaveProperty('id', orderId);
            expect(res.body).toHaveProperty('email', order1.email);

            const deletedOrder = await Order.findById(orderId);
            expect(deletedOrder).toBeNull(); // Order should be deleted
        });

        test('should return 404 if the order does not exist', async () => {
            const nonExistentId = '605c72ef1f2a2b001e8d6c6d'

            const res = await request(server)
                .delete(`/api/orders/${nonExistentId}`)
                .set('Cookie', [`jwt=${token}`])
                .send();

            expect(res.status).toBe(httpStatus.NOT_FOUND);
            expect(res.body).toHaveProperty('error', 'Order not found');
        });

        test('should return 400 if the ID format is invalid', async () => {
            const invalidId = '12345';

            const res = await request(server)
                .delete(`/api/orders/${invalidId}`)
                .set('Cookie', [`jwt=${token}`])
                .send();

            expect(res.status).toBe(httpStatus.BAD_REQUEST);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('PATCH /api/orders/:id', () => {
        let orderId;

        beforeAll(async () => {
            const order = await insertOrders([order1]);
            orderId = order[0]._id.toString()
        });

        afterAll(async () => {
            await deleteOrders();
        });

        test('should update an existing order and return the updated order', async () => {
            const updatedData = {
                status: 'Shipped',
                totalPrice: 150,
            };

            const res = await request(server)
                .patch(`/api/orders/${orderId}`)
                .set('Cookie', [`jwt=${token}`])
                .send(updatedData)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body).toHaveProperty('id', orderId);
            expect(res.body).toHaveProperty('status', 'Shipped');
            expect(res.body).toHaveProperty('totalPrice', updatedData.totalPrice);
        });

        test('should return 404 if the order does not exist', async () => {
            const nonExistentId = '605c72ef1f2a2b001e8d6c6d'

            const res = await request(server)
                .patch(`/api/orders/${nonExistentId}`)
                .set('Cookie', [`jwt=${token}`])
                .send({ status: 'Shipped' })
                .expect('Content-Type', /json/)
                .expect(404);

            expect(res.body.error).toBe('Order not found');
        });
    });

    describe('GET /api/orders/admin', () => {
        beforeAll(async () => {
            await insertOrders([order1, order2]);
        });

        afterAll(async () => {
            await deleteOrders();
        });

        test('should fetch all orders', async () => {
            const res = await request(server)
                .get('/api/orders/admin')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.length).toBeGreaterThanOrEqual(2);
            expect(res.body[0]).toHaveProperty('items');
            expect(res.body[0]).toHaveProperty('totalPrice');
        });

        test('should fetch orders with sorting', async () => {
            const res = await request(server)
                .get('/api/orders/admin')
                .set('Cookie', [`jwt=${token}`])
                .query({ _sort: 'totalPrice', _order: 'desc' })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body[0].totalPrice).toBeGreaterThanOrEqual(res.body[1].totalPrice);
        });

        test('should fetch orders with pagination', async () => {
            const res = await request(server)
                .get('/api/orders/admin')
                .set('Cookie', [`jwt=${token}`])
                .query({ _page: 1 })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.length).toBeLessThanOrEqual(10);
        });
    });
})