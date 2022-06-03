constconst express = require("express");
const cors = require("cors");
const estabelecimentosRotas = require('./routes/estabelecimentoRota')


const app = express();


app.use(cors());
app.use(express.json());

app.use("/estabelecimentos", estabelecimentosRotas)
module.exports = app;
