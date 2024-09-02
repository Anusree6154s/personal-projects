const setupTestDB = require('../utils/setupDB.js');
const request = require('supertest');
const server = require('../../src/server.js');
const httpStatus = require('http-status');
const { product1, deleteProducts, product2, product3, product4, insertProducts } = require('../fixtures/product.fixture.js');
const { Product } = require('../../src/model/product.model.js');
const { insertUsers, userOne, dbDataOne, userTwo } = require('../fixtures/user.fixtures.js');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env.config.js');

setupTestDB();

describe("Product routes", () => {
    let token
    beforeAll(async () => {
        // create a user and use its _id to create a jwt token
        const data = await insertUsers(userOne)
        token = jwt.sign({ id: data._id, ...data }, env.jwt.secret_key)
    })

    describe('POST /api/products', () => {
        afterAll(async () => {
            await deleteProducts()
        });

        test("should create a new product and return 201 with the created product data", async () => {

            // Send a POST request to create a new product
            const response = await request(server)
                .post("/api/products")
                .set('Cookie', [`jwt=${token}`])
                .send(product1)
                .expect(httpStatus.CREATED);

            // Check that the response contains the product data
            expect(response.body).toMatchObject({
                id: expect.any(String),
                ...product1
            });

            // Check that the product is actually saved in the database
            const productInDb = await Product.findById(response.body.id);
            expect(productInDb).toBeDefined();
            expect(productInDb.title).toBe(product1.title);
        });
    })

    describe('GET /api/products', () => {
        beforeAll(async () => {
            // Insert sample product
            await insertProducts([
                { ...product1 },
                { ...product2 },
                { ...product3, deleted: true },
                { ...product4 }])
        });

        afterAll(async () => {
            await deleteProducts()
        });

        test('should fetch products for user role (excluding deleted products)', async () => {
            const response = await request(server)
                .get('/api/products')
                .set('Cookie', [`jwt=${token}`])
                .query({ role: 'user' }) // Pass role as 'user'
                .expect(httpStatus.OK);

            expect(response.body).toHaveLength(3); // Only non-deleted products
            response.body.forEach(product => {
                expect(product.deleted).toBe(false);
            });
        });

        test('should fetch products for admin role (including deleted products)', async () => {
            const response = await request(server)
                .get('/api/products')
                .set('Cookie', [`jwt=${token}`])
                .query({ role: 'admin' }) // Pass role as 'admin'
                .expect(httpStatus.OK);

            expect(response.body).toHaveLength(4); // All products, including deleted
        });

        test('should filter products by category', async () => {
            const response = await request(server)
                .get('/api/products')
                .set('Cookie', [`jwt=${token}`])
                .query({ role: 'user', category: 'SampleCategory 2' }) // Filter by category
                .expect(httpStatus.OK);

            expect(response.body).toHaveLength(1); // Only one product in 'SampleCategory 2' that is not deleted
            expect(response.body[0].category).toBe('SampleCategory 2');
        });

        test('should sort products by title in descending order', async () => {
            const response = await request(server)
                .get('/api/products')
                .set('Cookie', [`jwt=${token}`])
                .query({ role: 'user', _sort: 'title', _order: 'desc' }) // Sort by title
                .expect(httpStatus.OK);

            expect(response.body[0].title).toBe('Sample Product 4');
            expect(response.body[1].title).toBe('Sample Product 2');
            expect(response.body[2].title).toBe('Sample Product 1');
        });

        test('should paginate products (page 1, 2 items per page)', async () => {
            const response = await request(server)
                .get('/api/products')
                .set('Cookie', [`jwt=${token}`])
                .query({ role: 'user', _page: 1 }) // Request page 1
                .expect(httpStatus.OK);

            expect(response.body).toHaveLength(3); // Only 3 products that are not deleted
        });
    })

    describe('GET /api/products/:id', () => {
        let productId
        beforeAll(async () => {
            // Insert sample product and get an ID for testing
            const products = await insertProducts([product1]);
            productId = products[0]._id;
        });

        afterAll(async () => {
            await deleteProducts();
        });

        test('should fetch a product by ID and return 200 with the product data', async () => {
            const response = await request(server)
                .get(`/api/products/${productId}`)
                .set('Cookie', [`jwt=${token}`])
                .expect(httpStatus.OK);

            // Check that the response contains the product data
            expect(response.body).toMatchObject({
                id: productId.toString(),
                title: 'Sample Product 1'
            });
        });

        test('should return 404 for a non-existent product ID', async () => {
            const nonExistentId = '605c72ef1f2a2b001e8d6c6d';  // Example non-existent ID

            const response = await request(server)
                .get(`/api/products/${nonExistentId}`)
                .set('Cookie', [`jwt=${token}`])
                .expect(httpStatus.NOT_FOUND);

            // Check the error message
            expect(response.body.message).toBe('Product not found');
        });
    })


    describe('PATCH /api/products/:id', () => {
        let productId;

        beforeAll(async function () {
            // Insert sample product and get an ID for testing
            const products = await insertProducts([product1]);
            productId = products[0]._id;
        });

        afterAll(async function () {
            await deleteProducts();
        });

        test('should update a product and return the updated product', async function () {
            const updatedData = { title: 'Updated Product', price: 150 };

            const response = await request(server)
                .patch(`/api/products/${productId}`)
                .set('Cookie', [`jwt=${token}`])
                .send(updatedData)
                .expect(httpStatus.OK);

            expect(response.body).toMatchObject({
                id: productId.toString(),
                title: 'Updated Product',
                price: 150
            });
        });

        test('should return a 404 if the product does not exist', async function () {
            const nonExistentId = '605c72ef1f2a2b001e8d6c6d'; // Generate a random ObjectId

            const response = await request(server)
                .patch(`/api/products/${nonExistentId}`)
                .set('Cookie', [`jwt=${token}`])
                .send({ name: 'Non-existent Product' })
                .expect(httpStatus.NOT_FOUND);

            expect(response.body.message).toBe('Product not found');
        });
    })
});
