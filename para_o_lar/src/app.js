const express = require("express")     //IMPORTANDO A DEPENDÊNCIA
const cors = require("cors")           //IMPORTANDO O CORS
const lojasRotas = require("./routes/lojasRotas")

const app = express()                  //CRIAR API

app.use(express.json())                //CONFIGURAR API
app.use(cors())                        //PERMITE O BODYPARSER

//ROTAS
app.use("/lojas", lojasRotas)

module.exports = app