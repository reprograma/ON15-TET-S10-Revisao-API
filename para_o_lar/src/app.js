const express = require("express");
const cors = require("cors");
const estabelecimentosRotas = require("./routes/estabelecimentoRotas")
const app = express();


app.use(cors());
app.use(express.json());

app.use("/estabelecimentos", estabelecimentosRotas)
module.exports = app;   