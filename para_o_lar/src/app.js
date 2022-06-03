const express = require("express");
const cors = require("cors");
const rotasDoEstabele = require('./routes/estabeleRotas')

const app = express();


app.use(cors());
app.use(express.json());


////rotas

app.use("/lojas", rotasDoEstabele)

module.exports = app;   