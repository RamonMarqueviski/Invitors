const express = require('express');
const ClubeController = require('../controllers/ClubeController');
const AtletaController = require('../controllers/AtletaController');

const routes = express.Router();

//Rotas referentes a clubes
routes.get('/clubes', ClubeController.index);
routes.post('/clubes', ClubeController.store);
routes.put('/clubes/:id', ClubeController.update);
routes.delete('/clubes/:id', ClubeController.delete);

//Rotas referentes a atletas
routes.get('/atletas', AtletaController.index);
routes.post('/atletas', AtletaController.store);


module.exports = routes;
