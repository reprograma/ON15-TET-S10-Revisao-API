// importar as dependencias
const express = require('express');
const cors = require('cors')
const estabalecimentosRotas = require('./routes/estabelecimentosRoutes')

// criar a api
const app = express();

// configurar a api
app.use(express.json())
app.use(cors())

// rotas
//         path                  rotas
app.use("/estabelecimentos", estabalecimentosRotas)

// exporta ( deixa publica) a nossa api
module.exports = app