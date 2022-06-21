require("dotenv").config();

const express = require('express');
const routes = require('./routes');

//require('./database');
const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());

app.use(routes);

app.listen(port, function(){
  console.log("Servidor está rodando na porta: " + port);
})