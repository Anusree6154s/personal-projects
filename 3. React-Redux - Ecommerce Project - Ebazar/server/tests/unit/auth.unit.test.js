const request = require('supertest');
const server = require('../../src/server'); 
const { createUserFixture, deleteUsers } = require('../fixtures/user.fixtures');
const { constant } = require('../../src/config/env.config');
const jwt = require('jsonwebtoken');
const status = require('http-status');

describe('Auth Integration test', ()=>{
  test('dummy test', ()=>{
      expect(true).toBe(true);
  })
})
describe('Auth Routes', () => {
  

  describe('POST /api/users', () => {
    afterAll(async () => {
      await deleteUsers()
    });

    test('should create a user and return a token', async () => {
      // Mock implementations
      const mockUserData = { email: 'test@example.com', password: 'password123' };
      const mockSanitizedUser = { id: '123', email: 'test@example.com' };
      const mockToken = 'jwtToken';
  
      const validate = jest.fn()
      validate.mockReturnValue(true)
      validate.mockImplementation(() => {});
      cryptoService.crytpoSignup.mockResolvedValue(mockUserData);
      jwt.sign.mockReturnValue(mockToken);
      sanitizeUtil.santizeUser.mockReturnValue(mockSanitizedUser);
  
      const res = await request(server)
        .post('/api/users')
        .send(mockUserData)
        .expect('Content-Type', /json/)
        .expect(201);
  
      expect(res.body).toEqual(mockSanitizedUser);
      expect(res.headers['set-cookie']).toBeDefined();
      expect(res.headers['set-cookie'][0]).toContain('jwt=jwtToken');
    });
  
    test('should throw an error if validation fails', async () => {
      // Mock implementations
      validate.mockImplementation(() => {
        throw new Error('Validation failed');
      });
  
      const mockUserData = { email: 'invalid', password: 'short' };
  
      const res = await request(server)
        .post('/api/users')
        .send(mockUserData)
        .expect('Content-Type', /json/)
        .expect(400);
  
      expect(res.body.message).toBe('Validation failed');
    });
  
    test('should handle cryptoService error', async () => {
      // Mock implementations
      validate.mockImplementation(() => {});
      cryptoService.crytpoSignup.mockRejectedValue(new Error('CryptoService error'));
  
      const mockUserData = { email: 'test@example.com', password: 'password123' };
  
      const res = await request(server)
        .post('/api/users')
        .send(mockUserData)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(res.body.message).toBe('CryptoService error');
    });
  });
});
