// importar as dependencias
const express = require('express');
const cors = require('cors')

// criar a api
const app = express();

// configurar a api
app.use(express.json())
app.use(cors())

// rotas

// exporta ( deixa publica) a nossa api
module.exports = app