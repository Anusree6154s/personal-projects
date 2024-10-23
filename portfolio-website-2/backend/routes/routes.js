const express = require('express');
const { fetchRepo } = require('../controllers/user.controller');
const routes = express.Router()

routes.get('/fetch-repos', (req, res, next) => {
    console.log('called'); next()
}, fetchRepo)
// .post('/users', createUser)
// .put('/users/:id', updateUser)
// .delete('/users/:id', deleteUser);

module.exports = routes