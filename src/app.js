// importar as dependencias
const express = require('express');
const cors = require('cors')
const livrosRotas = require('./routes/livroRotas')

// criar a api
const app = express();

// configurar a api
app.use(express.json()) // app.use insere configurações e recursos(rota)
app.use(cors())

// rotas
//        path      rotas
app.use("/livros", livrosRotas)

//exporta (deixe publica) a nossa api
module.exports = app

