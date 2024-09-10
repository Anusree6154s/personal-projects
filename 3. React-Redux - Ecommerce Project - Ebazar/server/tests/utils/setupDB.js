const mongoose = require("mongoose");
const { env } = require("../config/env.config");
const server = require("../../src/server.js");

// jest.useFakeTimers()
const setupTestDB = () => {
  const mongoURI = env.mongoose.uri
  const serverURL = env.server.port

  let serverInstance

  beforeAll(async () => {
    // await mongoose.connect(mongoURI)
    //   .then(async () => {
    //     console.log('Connected to MongoDB URI: ' + mongoURI)
    //     serverInstance = await server.listen(serverURL, () => {
    //       console.log('Test-Server running on port ' + serverURL)
    //     })
    //     jest.runAllTimersAsync()
    //   })
    //   .catch(error => console.log('Mongoose test error:', error))

    try {
      await mongoose.connect(mongoURI)
      // console.log('Connected to MongoDB URI: ' + mongoURI)
      serverInstance = await server.listen(serverURL, () => {
        // console.log('Test-Server running on port ' + serverURL)
      })
      // jest.runAllTimersAsync()
    } catch (error) {
      console.log('Mongoose test error:', error)
    }
  });

  // beforeEach(async () => {
  //   await mongoose.connection.db.dropDatabase();
  // });

  afterAll(async () => {
    // jest.clearAllTimers()
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await serverInstance.close()
  });
};

module.exports = setupTestDB
