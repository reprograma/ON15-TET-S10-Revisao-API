// importar as dependencias
const express = require('express');
const cors = require('cors')
const livrosRotas = require('./routes/livroRotas')

// criar a api
const app = express();

// configurar a api
<<<<<<< HEAD
app.use(express.json()) // app.use insere configurações e recursos(rota)
app.use(cors())

// rotas
//        path      rotas
app.use("/livros", livrosRotas)

//exporta (deixe publica) a nossa api
module.exports = app

=======
app.use(express.json())
app.use(cors())

// rotas
//         path     rotas
app.use("/livros", livrosRotas)

// exporta ( deixa publica) a nossa api
module.exports = app
>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881
