const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Clube = require('../models/Clube');
const Atleta = require('../models/Atleta');
const Competicoes = require('../models/Competicao');

const connection = new Sequelize(dbConfig);

Clube.init(connection);
Atleta.init(connection);
Competicoes.init(connection);

Clube.associate(connection.models);
Atleta.associate(connection.models);
Competicoes.associate(connection.models);

module.exports = connection;