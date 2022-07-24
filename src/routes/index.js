const express = require("express");
const ClubeController = require("../controllers/ClubeController");
const AtletaController = require("../controllers/AtletaController");
const CompeticaoController = require("../controllers/CompeticaoController");
const CategoriaController = require("../controllers/CategoriaController");
const UsuarioController = require("../controllers/UsuarioController");
const StatusController = require("../controllers/StatusController");

const routes = express.Router();

//Rotas referentes a clubes
routes.get("/clubes", ClubeController.index);
routes.post("/clubes", ClubeController.store);
routes.put("/clubes/:id", ClubeController.update);
routes.delete("/clubes/:id", ClubeController.delete);

//Rotas referentes a atletas
routes.get("/atletas", AtletaController.todos);
routes.get("/atletas/:id", AtletaController.index);
routes.get("/atletas/cpf/:cpf", AtletaController.indexByCPF);
routes.post("/atletas", AtletaController.store);
routes.put("/atletas/:id", AtletaController.update);
routes.delete("/atletas/:id", AtletaController.delete);
routes.get("/atletas/id/:id", AtletaController.indexById);

//Rotas referentes a competiçao
//Rotas de inscrever atleta em competição
routes.post(
  "/competicoes/:idCompeticao/inscrever",
  CompeticaoController.inscreverAtleta
);
//Rotas de desinscrever atleta em competição
routes.delete("/competicoes/:idCompeticao/desinscrever", CompeticaoController.desinscreverAtleta);
//Rotas de listar atletas inscritos em competição
routes.get(
  "/competicoes/:idCompeticao/categoria/:idCategoria/atletas",
  CompeticaoController.listarAtletasInscritosCompeticao
);

//Rotas referentes ao CRUD de competicao
routes.get("/competicao", CompeticaoController.index);
routes.post("/competicao", CompeticaoController.store);
routes.put("/competicao/:id", CompeticaoController.update);
routes.delete("/competicao/:id", CompeticaoController.delete);
//Rotas referentes a exportacao do xlsx
routes.get("/competicao/:id/xlsx", CompeticaoController.gerarXLSX);

//Rotas referentes a categoria
//Rotas referentes ao CRUD de categoria
routes.get("/categoria", CategoriaController.index);
routes.post("/categoria", CategoriaController.store);
routes.put("/categoria/:id", CategoriaController.update);
routes.delete("/categoria/:id", CategoriaController.delete);
//Crud uma categoria a uma competicao
routes.post(
  "/competicao/:id/categoria",
  CategoriaController.addCategoriaEmCompeticao
);
routes.put(
  "/competicao/:idCompeticao/categoria/:idCategoria",
  CategoriaController.addPaidCategoriaCompeticao
);
routes.delete(
  "/competicao/:id/categoria/:idCategoria",
  CategoriaController.removeCategoriaEmCompeticao
);
routes.get(
  "/competicao/:id/categoria",
  CategoriaController.indexCategoriasEmCompeticao
);

//Rotas referentes a usuario
//Rotas referentes ao CRUD de usuario
routes.get("/usuario", UsuarioController.index);
routes.post("/usuario", UsuarioController.store);
routes.put("/usuario/:id", UsuarioController.update);
routes.delete("/usuario/:id", UsuarioController.delete);

//Busca index por Clube
routes.get("/usuario/clube/:id", UsuarioController.indexPorClube);
//Rotas verifica login
routes.post("/usuario/login", UsuarioController.login);

//Rotas referentes ao CRUD de status
routes.get("/status", StatusController.index);
routes.post("/status", StatusController.store);
routes.put("/status/:id", StatusController.update);
routes.delete("/status/:id", StatusController.delete);

module.exports = routes;
