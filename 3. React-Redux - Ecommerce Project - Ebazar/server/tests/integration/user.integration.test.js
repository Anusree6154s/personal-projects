
const request = require('supertest');
const setupTestDB = require('../utils/setupDB.js');
const server = require('../../src/server.js');
const { userOne, deleteUsers, insertUsers, userTwo, dbDataOne } = require('../fixtures/user.fixtures.js');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env.config.js');

setupTestDB();

describe("User routes", () => {
    let token;
    let userId;
    beforeAll(async () => {
        // create a user and use its _id to create a jwt token
        const data = await insertUsers(dbDataOne)
        userId = data._id.toString()
        token = jwt.sign({ id: data._id, ...data }, env.jwt.secret_key)
    })

    afterAll(async () => {
        await deleteUsers();
    });

    describe('GET /api/users/user', () => {
        test('should return current user details', async () => {
            const res = await request(server)
                .get(`/api/users/user`)
                .set('Cookie', [`jwt=${token}`])
                .expect(200);

            expect(res.body).toMatchObject({
                email: dbDataOne.email,
                role: dbDataOne.role,
                addresses: [],
                orders: [],
                id: userId
            });
        });

        test('should return 401 if no token is provided', async () => {
            const res = await request(server)
                .get(`/api/users/user`)
                .expect(401);
            expect(res.text).toContain('Authentication Failed');
        });
    })

    describe('PATCH /api/users/user/:id', () => {
        test('should update user details for a valid ID', async () => {
            const updatedData = {
                name: 'Updated User',
                email: 'updateduser@example.com',
                phone: 987654321,
                address: '456 Main St',
                image: 'updated_image_url',
            };

            const res = await request(server)
                .patch(`/api/users/user/${userId}`)
                .set('Cookie', [`jwt=${token}`])
                .send(updatedData)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body).toMatchObject({
                id: String(userId),
                email: 'updateduser@example.com',
                role: 'user',
                addresses: [],
                address: '456 Main St',
                name: 'Updated User',
                phone: 987654321,
                image: 'updated_image_url',
            });
        });

        test('should return 404 if user is not found', async () => {
            const nonExistentUserId = '605c72ef1f2a2b001e8d6c6d';

            const res = await request(server)
                .patch(`/api/users/user/${nonExistentUserId}`)
                .set('Cookie', [`jwt=${token}`])
                .send({
                    name: 'Non-existent User',
                })
                .expect(404);

            expect(res.body.message).toBe('User not found');
        });

        test('should return 401 if no token is provided', async () => {
            await request(server)
                .patch(`/api/users/user/${userId}`)
                .send({
                    name: 'Unauthorized Update',
                })
                .expect(401);
        });

        test('should return 400 if the ID is invalid', async () => {
            const invalidId = '12345'; // Invalid MongoDB ObjectID

            const res = await request(server)
                .patch(`/api/users/user/${invalidId}`)
                .set('Cookie', [`jwt=${token}`])
                .send({
                    name: 'Invalid ID Update',
                })
                .expect(400);

            expect(res.body.error).toContain('Invalid _id: 12345');
        });
    })
})