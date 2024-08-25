
const request = require('supertest');
const setupTestDB = require('../utils/setupDB.js');
const mongoose = require('mongoose');
const server = require('../../src/server.js');


setupTestDB();

// describe('Dummy Test Template', () => {
//   test('dummy test', () => {
//     expect(true).toBe(true);
//   })
// })

describe("Connection Integration", () => {
    test("should be connected to MongoDB", () => {
      expect(mongoose.connection.readyState).toBe(1); // 1 means connected
    });

    test("should be connected to the server", async () => {
      const res = await request(server).get("/");
      expect(res.statusCode).toBe(200);
    });
});

