const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const livrariasRoutes = require("./routes/livrariasRoutes.js");

app.use("/livrarias", livrariasRoutes);

module.exports = app

