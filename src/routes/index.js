const express = require('express');
const ClubeController = require('../controllers/ClubeController');
const AtletaController = require('../controllers/AtletaController');
const CompeticaoController = require('../controllers/CompeticaoController');
const CategoriaController = require('../controllers/CategoriaController');

const routes = express.Router();

//Rotas referentes a clubes
routes.get('/clubes', ClubeController.index);
routes.post('/clubes', ClubeController.store);
routes.put('/clubes/:id', ClubeController.update);
routes.delete('/clubes/:id', ClubeController.delete);

//Rotas referentes a atletas
routes.get('/atletas', AtletaController.index);
routes.post('/atletas', AtletaController.store);
routes.put('/atletas/:id', AtletaController.update);
routes.delete('/atletas/:id', AtletaController.delete);

//Rotas referentes a competiçao
    //Rotas referentes ao CRUD de competicao
    routes.get('/competicao', CompeticaoController.index);
    routes.post('/competicao', CompeticaoController.store);
    routes.put('/competicao/:id', CompeticaoController.update);
    routes.delete('/competicao/:id', CompeticaoController.delete);
    //Rotas referentes a exportacao do xlsx 
    routes.get('/competicao/xlsx', CompeticaoController.gerarXLSX);

//Rotas referentes a categoria
    //Rotas referentes ao CRUD de categoria
routes.get('/categoria', (req,res) => {
    res.send({categoria: 'oi'}).status(200);
});
routes.post('/categoria', CategoriaController.store);
routes.put('/categoria/:id', CategoriaController.update);
routes.delete('/categoria/:id', CategoriaController.delete);
module.exports = routes;
