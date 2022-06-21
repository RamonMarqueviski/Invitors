const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Clube = require('../models/Clube');
const Atleta = require('../models/Atleta');
const Competicoes = require('../models/Competicao');

// console.log("ENV: " + );

const connection = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

connection 
  .authenticate()
  .then(() => console.log("Deu boa a conexão"))
  .catch((err) => console.log("Errouuuu a conexão : " + err))


Clube.init(connection);
Atleta.init(connection);
Competicoes.init(connection);

Clube.associate(connection.models);
Atleta.associate(connection.models);
Competicoes.associate(connection.models);

module.exports = connection;