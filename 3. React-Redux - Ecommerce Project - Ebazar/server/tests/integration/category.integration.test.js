
const request = require('supertest');
const setupTestDB = require('../utils/setupDB.js');
const server = require('../../src/server.js');
const { category1, deleteCategeories, insertCategories, category2 } = require('../fixtures/category.fixture.js');
const { insertUsers, userOne } = require('../fixtures/user.fixtures.js');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env.config.js');

setupTestDB();

describe("Category routes", () => {
    let token
    beforeAll(async () => {
        // create a user and use its _id to create a jwt token
        const data = await insertUsers(userOne)
        token = jwt.sign({ id: data._id, ...data }, env.jwt.secret_key)
    })

    describe('POST /api/categories', () => {

        afterEach(async () => {
            await deleteCategeories();
        });

        test('should create a new category and return it', async () => {
            const response = await request(server)
                .post('/api/categories')
                .set('Cookie', [`jwt=${token}`])
                .send(category1)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.value).toBe(category1.value);
            expect(response.body.label).toBe(category1.label);
        });

        test('should return 400 if category data is invalid', async () => {
            await request(server)
                .post('/api/categories')
                .set('Cookie', [`jwt=${token}`])
                .send({}) // sending empty body
                .expect(400);
        });
    })

    describe('GET /api/categories', () => {
        beforeEach(async () => {
            await insertCategories([category1, category2])
        });

        afterEach(async () => {
            await deleteCategeories();
        });


        test('should fetch all categories', async () => {
            const res = await request(server)
                .get('/api/categories')
                .set('Cookie', [`jwt=${token}`]);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0]).toHaveProperty('value', category1.value);
            expect(res.body[0]).toHaveProperty('label', category1.label);
            expect(res.body[1]).toHaveProperty('value', category2.value);
            expect(res.body[1]).toHaveProperty('label', category2.label);
        });
    })
})