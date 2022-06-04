// importar as dependencias
const express = require('express');
const app = express() // cria a API
const cors = require('cors')
const livrosRotas = require('./routes/livroRoutes')

// configurar a api
app.use(express.json())
app.use(cors())

// rotas
//         path     rotas
app.use("/livros", livrosRotas)

// exporta ( deixa publica) a nossa api
module.exports = app