const express = require("express");
const cors = require("cors");
const rotasLojas = require('../src/routes/estabelecimentosRotas')
const app = express();


app.use(cors());
app.use(express.json());
app.use("/lojas",rotasLojas)


module.exports = app;   