const express = require("express");
const cors = require("cors");
const app = express();
const estabelecimentoRotas = require('./routes/estabelecimentoRotas')  

app.use(cors());
app.use(express.json());
app.use('/estabelecimento', estabelecimentoRotas)

module.exports = app;   
