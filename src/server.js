require("dotenv").config();

const express = require('express');
const routes = require('./routes');
const cors = require('cors');


require('./database');
const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.timeout = 100000;

app.listen(port, function(){
  console.log("Servidor está rodando na porta: " + port);
})