// importar as dependencias
const express = require('express');
const cors = require('cors')
const livroRoutes = require('./routes/livroRoutes')

// criar a api
const app = express();

// configurar a api
app.use(express.json())
app.use(cors())

// rotas
//         path     rotas
app.use("/livros", livroRoutes)

// exporta ( deixa publica) a nossa api
module.exports = app