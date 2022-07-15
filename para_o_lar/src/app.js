const express = require("express");
const cors = require("cors");
const estabelecimentosRoutes = require("./routes/estabelecimentosRoutes")
const app = express();

app.use(cors());
app.use(express.json());

app.use("/estabelecimentos", estabelecimentosRoutes)
module.exports = app;   