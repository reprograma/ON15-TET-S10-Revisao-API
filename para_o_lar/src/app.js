const express = require("express");
const cors = require("cors");
const app = express();

const estabelecimentosRoutes = require('./routes/estabelecimentoRoutes')

app.use(cors());
app.use(express.json());

app.use('/estabelecimentos', estabelecimentosRoutes)

module.exports = app;   