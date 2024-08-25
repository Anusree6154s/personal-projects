//contains only mongoose connection
require('dotenv').config();
const server = require('./server')
const mongoose = require('mongoose');
const { env } = require('./config/env.config')

const mongoURI = env.mongoose.uri
const serverURL = env.server.port


mongoose.connect(mongoURI).then(async () => {
    console.log('Connected to MongoDB URI: ' + mongoURI)
    server.listen(serverURL, () => {
        console.log('Server running on port ' + serverURL)
    })
}).catch((error) => console.log('Mongoose error:', error))

// console.log(httpServer.address())
// Enable Mongoose debugging to log all queries
// mongoose.set('debug', function (collectionName, methodName, ...methodArgs) {
//     console.log('collectionName:', collectionName)
//     console.log('methodName:', methodName)
//     console.log('methodArgs:', methodArgs)
// });