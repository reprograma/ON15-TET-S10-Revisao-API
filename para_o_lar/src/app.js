const express = require("express");
const cors = require("cors");
const app = express();
const estabelecimentoRotas = require('./routes/estabelecimentoRotas');  
const { buscarPorID } = require("./controllers/estabelecimentoController");

app.use(cors());
app.use(express.json());
app.use('/estabelecimento', estabelecimentoRotas)
app.use('/estabelecimento', buscarPorID)

module.exports = app;   
