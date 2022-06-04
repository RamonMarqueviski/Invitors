const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Clube = require('../models/Clube');
const Atleta = require('../models/Atleta');

const connection = new Sequelize(dbConfig);

Clube.init(connection);
Atleta.init(connection);

Clube.associate(connection.models);
Atleta.associate(connection.models);

module.exports = connection;