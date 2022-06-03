const express = require("express");
const cors = require("cors");
const estabelecimentoRoute = require("./routes/estabelecimentoRoute") 

const app = express();

app.use(express.json());

app.use(cors());

app.use("/livrarias", estabelecimentoRoute)


module.exports = app;   