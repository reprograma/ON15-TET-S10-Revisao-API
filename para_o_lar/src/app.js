const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());

const estabelecimentosRoutes = require("./routes/estabelecimentosRotas")

app.use("/estabelecimentos", estabelecimentosRoutes)

module.exports = app;   