const setupTestDB = require('../utils/setupDB.js');
const { faker } = require('@faker-js/faker')
const request = require('supertest');
const server = require('../../src/server.js');
const httpStatus = require('http-status');
const { User } = require('../../src/model/user.model');
const { insertUsers, userOne, deleteUsers, dbDataOne, userTwo, findUser } = require('../fixtures/user.fixtures.js');
const jwt = require("jsonwebtoken");


setupTestDB();


// describe('Dummy Test Template', () => {
//     test('dummy test', () => {
//         expect(true).toBe(true);
//     })
// })

describe("Auth routes", () => {
    describe("POST /api/auth/signup", () => {
        let newUser;
        beforeEach(async () => {
            await deleteUsers();
            newUser = { ...userOne };
        });


        test("should return 201 and registered user on successful signup", async () => {
            const res = await request(server).post("/api/auth/signup").send(newUser);

            //assert res
            expect(res.status).toEqual(httpStatus.CREATED);
            expect(res.body).toMatchObject({
                id: expect.anything(),
                email: newUser.email,
                role: 'user',
                addresses: [],
                orders: []
            })
            expect(res.headers['set-cookie']).toBeDefined();

            //assert res in db
            const dbUser = await User.findById(res.body.id);
            expect(dbUser).toBeDefined();
            expect(dbUser.password).not.toBe(newUser.password);
            expect(dbUser).toMatchObject({
                email: newUser.email,
                password: expect.any(Buffer),
                role: 'user',
                addresses: [],
                address: undefined,
                name: undefined,
                phone: undefined,
                image: undefined,
                orders: [],
                salt: expect.any(Buffer)
            });
        });

        test("should return 400 error if no email", async () => {
            delete newUser.email;

            const res = await request(server).post("/api/auth/signup").send(newUser);

            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        });

        test("should return 400 error if no password", async () => {
            delete newUser.password;

            const res = await request(server).post("/api/auth/signup").send(newUser);

            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        });

        test("should return 409 error if email is already used", async () => {
            // Ref - https://stackoverflow.com/a/53144807
            await insertUsers(dbDataOne)

            const res = await request(server).post("/api/auth/signup").send(newUser);

            expect(res.status).toEqual(httpStatus.CONFLICT);
        });

        test("should return 400 error if password length is less than 8 characters", async () => {
            newUser.password = "passwo1";

            const res = await request(server).post("/api/auth/signup").send(newUser);

            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        });

        test("should return 400 error if email has invalid syntax", async () => {
            newUser.email = "invalidEmail";

            const res = await request(server).post("/api/auth/signup").send(newUser);

            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        });


        test("should return 400 error if password has invalid syntax", async () => {
            newUser.password = "password";
            let res = await request(server).post("/api/auth/signup").send(newUser);
            expect(res.status).toEqual(httpStatus.BAD_REQUEST);

            newUser.password = "11111111";
            res = await request(server).post("/api/auth/signup").send(newUser);
            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        });
    });

    describe("POST /api/auth/login", () => {
        beforeAll(async () => {
            await deleteUsers();
            await insertUsers(dbDataOne);
        });

        test("should return 200 and login user on successful login", async () => {
            const loginCredentials = { ...userOne };

            const res = await request(server)
                .post("/api/auth/login")
                .send(loginCredentials);


            expect(res.status).toEqual(httpStatus.OK);
            expect(res.body).toEqual(
                expect.objectContaining({
                    id: expect.anything(),
                    email: loginCredentials.email,
                    role: 'user',
                    addresses: [],
                    orders: []
                })
            );
            expect(res.headers['set-cookie']).toBeDefined();
        });

        test("should return 401 error if there are no users with that email", async () => {
            const loginCredentials = { ...userTwo };

            const res = await request(server)
                .post("/api/auth/login")
                .send(loginCredentials);

            expect(res.status).toEqual(httpStatus.UNAUTHORIZED);
        });

        test("should return 401 error if password is wrong", async () => {
            const loginCredentials = {
                email: userOne.email,
                password: "wrongPassword1",
            };

            const res = await request(server)
                .post("/api/auth/login")
                .send(loginCredentials);

            expect(res.status).toEqual(httpStatus.UNAUTHORIZED);
        });

        test("should return 400 error if email field isn't present", async () => {
            const loginCredentials = {
                password: userOne.password,
            };

            const res = await request(server)
                .post("/api/auth/login")
                .send(loginCredentials);

            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        });

        test("should return 400 error if password field isn't present", async () => {
            const loginCredentials = {
                email: userOne.email,
            };

            const res = await request(server)
                .post("/api/auth/login")
                .send(loginCredentials);

            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        });
    });

    describe("POST /api/auth/sendOTP", () => {
        beforeAll(async () => {
            await deleteUsers();
            await insertUsers(dbDataOne);
        });

        test("should return 200 and send OTP on success", async () => {
            const payload = { email: userOne.email };

            const res = await request(server)
                .post("/api/auth/sendOTP")
                .send(payload);


            expect(res.status).toEqual(httpStatus.OK);
        });

        test("should return 401 error if there are no users with that email", async () => {
            const payload = { email: userTwo.email };

            const res = await request(server)
                .post("/api/auth/sendOTP")
                .send(payload);


            expect(res.status).toEqual(httpStatus.NOT_FOUND);
        });
    });

    describe("PATCH /api/auth/resetpassword/:id", () => {
        let userid
        beforeAll(async () => {
            await deleteUsers()
            const data = await insertUsers(dbDataOne)
            userid = data._id
        });

        test("should return 200 and send OTP on success", async () => {
            const payload = { password: userOne.password };

            const res = await request(server)
                .patch("/api/auth/resetpassword/" + userid)
                .send(payload);

            expect(res.status).toEqual(httpStatus.OK);
        }, 10000);

        test("should return 400 error if password length is less than 8 characters", async () => {
            const payload = { password: "passwo1" };

            const res = await request(server).patch("/api/auth/resetpassword/" + userid).send(payload);

            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        });

        test("should return 400 error if password has invalid syntax", async () => {
            const payload = { password: "password" };
            let res = await request(server).patch("/api/auth/resetpassword/" + userid).send(payload);
            expect(res.status).toEqual(httpStatus.BAD_REQUEST);

            payload.password = "11111111"
            res = await request(server).patch("/api/auth/resetpassword/" + userid).send(payload);
            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        });
    });

    describe("PATCH /api/auth/check", () => {
        let tokenCookie;

        beforeAll(async () => {
            // Simulate a login to get the JWT token cookie
            const loginResponse = await request(server)
                .post("/api/auth/login")
                .send({ ...userOne });

            // Extract the token cookie from the login response
            tokenCookie = loginResponse.headers['set-cookie'].find(cookie => cookie.startsWith('jwt='));
        });

        test("should return 200 and user data with valid JWT token", async () => {
            const res = await request(server)
                .get("/api/auth/check")
                .set('Cookie', tokenCookie); // Include the cookie in the request

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                id: expect.anything(),
                email: userOne.email,
                role: 'user',
                addresses: [],
                orders: []
            });
        });

        test("should return 401 if no JWT token is provided", async () => {
            const res = await request(server)
                .get("/api/auth/check");

            expect(res.status).toBe(401);
        });
    });

    describe("PATCH /api/auth/logout", () => {
        let tokenCookie;

        beforeAll(async () => {
            // Simulate a login to get the JWT token cookie
            await deleteUsers()
            await insertUsers(dbDataOne)
            const loginResponse = await request(server)
                .post("/api/auth/login")
                .send({ ...userOne });

            // Extract the token cookie from the login response
            tokenCookie = loginResponse.headers['set-cookie'].find(cookie => cookie.startsWith('jwt='));
        });

        test("should clear the JWT cookie and return 200 on logout", async () => {
            const res = await request(server)
                .get("/api/auth/logout")
                .set('Cookie', tokenCookie); // Include the JWT cookie in the request

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: null });

            // Check if the cookie was cleared
            const cookies = res.headers['set-cookie'];
            const tokenCookieAfterLogout = cookies.find(cookie => cookie.startsWith('jwt='));

            // verify that cookieis cleared and set with an expiration date in the past
            expect(tokenCookieAfterLogout).toMatch(/^jwt=; Path=\/; Expires=Thu, 01 Jan 1970 00:00:00 GMT$/);
        });
    });
});

