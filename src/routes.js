const { Router } = require('express');


const UserController = require('./app/controllers/Usercontroller');
const SessionController = require('./app/controllers/Sessioncontroller');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();



routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);


//todas as rotas abaixo desse middleware precisa estar autenticado.
routes.use(authMiddleware);
routes.put('/users', UserController.update);



module.exports = routes;
