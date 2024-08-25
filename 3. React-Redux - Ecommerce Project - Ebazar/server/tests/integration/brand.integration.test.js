
const request = require('supertest');
const setupTestDB = require('../utils/setupDB.js');
const server = require('../../src/server.js');
const { brand1, deleteBrands, insertBrands, brand2 } = require('../fixtures/brand.fixture.js');
const { insertUsers, userOne } = require('../fixtures/user.fixtures.js');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env.config.js');

setupTestDB();

describe("Brand routes", () => {
    let token
    beforeAll(async () => {
        // create a user and use its _id to create a jwt token
        const data = await insertUsers(userOne)
        token = jwt.sign({ id: data._id, ...data }, env.jwt.secret_key)
    })

    describe('POST /api/brands', () => {

        afterEach(async () => {
            await deleteBrands();
        });

        test('should create a new brand and return it', async () => {
            const response = await request(server)
                .post('/api/brands')
                .set('Cookie', [`jwt=${token}`])
                .send(brand1)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.value).toBe(brand1.value);
            expect(response.body.label).toBe(brand1.label);
        });

        test('should return 400 if brand data is invalid', async () => {
            await request(server)
                .post('/api/brands')
                .set('Cookie', [`jwt=${token}`])
                .send({}) // sending empty body
                .expect(400);
        });
    })

    describe('GET /api/brands', () => {
        beforeEach(async () => {
            await insertBrands([brand1, brand2])
        });

        afterEach(async () => {
            await deleteBrands();
        });


        test('should fetch all brands', async () => {
            const res = await request(server)
                .get('/api/brands')
                .set('Cookie', [`jwt=${token}`]);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0]).toHaveProperty('value', brand1.value);
            expect(res.body[0]).toHaveProperty('label', brand1.label);
            expect(res.body[1]).toHaveProperty('value', brand2.value);
            expect(res.body[1]).toHaveProperty('label', brand2.label);
        });
    })
})