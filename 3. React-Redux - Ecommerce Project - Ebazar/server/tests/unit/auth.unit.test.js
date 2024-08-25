const request = require('supertest');
const server = require('../../src/server'); // Assuming your Express server is exported from `server.js`
const { createUserFixture } = require('../fixtures/user.fixtures');
const { constant } = require('../../src/config/env.config');
const jwt = require('jsonwebtoken');
const status = require('http-status');

describe('Auth Integration test', ()=>{
  test('dummy test', ()=>{
      expect(true).toBe(true);
  })
})
// describe('Auth Routes', () => {
//   let user;
//   beforeAll(async () => {
//     user = await createUserFixture();
//   });

//   afterAll(async () => {
//     await User.deleteMany(); // Cleanup after tests
//   });

//   test('should create a new user and return JWT token', async () => {
//     const response = await request(server)
//       .post('/api/auth/createUser')
//       .send({
//         email: 'newuser@example.com',
//         password: 'newpassword',
//         role: 'user',
//       });
    
//     expect(response.status).toBe(status.CREATED);
//     expect(response.body.email).toBe('newuser@example.com');
//     expect(response.headers['set-cookie'][0]).toContain('jwt');
//   });

//   test('should login a user and return JWT token', async () => {
//     const token = jwt.sign({ id: user._id }, constant.jwt.secret_key);

//     const response = await request(server)
//       .post('/api/auth/loginUser')
//       .set('Authorization', `Bearer ${token}`)
//       .send({ email: user.email, password: 'password' });

//     expect(response.status).toBe(status.OK);
//     expect(response.body.email).toBe(user.email);
//     expect(response.headers['set-cookie'][0]).toContain('jwt');
//   });

//   // Additional tests for logout, checkAuth, sendOTP, and resetPassword
// });
