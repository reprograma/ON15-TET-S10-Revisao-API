//importar dependências
const express = require('express');
const cors = require('cors');
const lojasRoutes = require('./routes/lojasRoutes');

// criar a api
const app = express();

//configurar a api
app.use(express.json());
app.use(cors());

//rotas
//         path    rotas
app.use("/lojas", lojasRoutes)

//exportar a api
module.exports = app;

//OK!