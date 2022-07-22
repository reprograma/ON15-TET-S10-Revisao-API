const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());

const rotas = require("./routes/estabelecimentos")

app.use("/estabelecimento", rotas)


module.exports = app;   