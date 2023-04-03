const { Router } = require('express');


const UserController = require('./app/controllers/Usercontroller');


const routes = new Router();



routes.post('/users', UserController.store);


module.exports = routes;
