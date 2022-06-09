const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const lispectorRoutes = require("./routes/lispectorRoutes.js");

app.use("/lispector", lispectorRoutes);

module.exports = app

