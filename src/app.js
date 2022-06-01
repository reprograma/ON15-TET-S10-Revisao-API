<<<<<<< HEAD
<<<<<<< HEAD
// importar as dependencias
const express = require('express');
const cors = require('cors')
const livrosRotas = require('./routes/livroRotas')

// criar a api
const app = express();

// configurar a api
app.use(express.json())
app.use(cors())

// rotas
//         path     rotas
app.use("/livros", livrosRotas)

// exporta ( deixa publica) a nossa api
=======
=======
>>>>>>> 9b159333f70525ae070b449d887ceb666ab80250
const express = require("express")
const cors = require("cors")
const app = express()
const livrosRoutes = require("./routes/livroRouter")

app.use(express.json())
app.use(cors())

app.use("/livros", livrosRoutes)



<<<<<<< HEAD
>>>>>>> 9b15933 (aula 28/05)
=======
>>>>>>> 9b159333f70525ae070b449d887ceb666ab80250
module.exports = app