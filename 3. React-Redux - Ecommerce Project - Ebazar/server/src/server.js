// //contains only server connections
const express = require('express');
const cors = require('cors') //to allow cross-origin resource sharing
var cookieParser = require('cookie-parser');//to get cookies 
const path = require("path")
const routes = require("./routes");
const { errorHandler } = require('./middlewares/errorHandler.middleware');
const passport = require("passport");
const { localStrategy, jwtStrategy } = require('./config/passport.config');

const server = express()


// to serve static files (js, main, css)
server.use(express.static(path.resolve(__dirname, '../..', 'client/build')))

//middlewares
server.use(cookieParser()); //to get cookies in  req.cookies["jwt"]
server.use(cors({
    exposedHeaders: ['X-Total-Count'],
    origin: 'http://localhost:3000', // Allow requests from the React app's dev server
    credentials: true,
}))
server.use(express.json()) //to parse request body
// server.use(express.raw({ type: 'application/json' })) //for webhook

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);


server.use('/', (req, res, next) => {
    // console.log('route success')
    next()
})
server.use('/api', routes)

// to get index.html and its routes
server.get('*', (req, res, next) => {
    // console.log('wild route called')
    next()
}, (req, res) => res.sendFile(path.resolve(__dirname, '../..', 'client/build', 'index.html')));
server.use(errorHandler)


module.exports = server