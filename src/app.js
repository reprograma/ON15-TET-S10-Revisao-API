
// Importar as dependencias

const express = require("express");
const cors = require ("cors")
const livrosRotas = require("./routes/livroRotas")
//Criar a API
const app = express();


//Configurar API
app.use(express.json)
app.use(cors())

//rotas
app.use("/livros", livrosRotas)
// exportar (deixa publica) a nossa api
module.exports = app