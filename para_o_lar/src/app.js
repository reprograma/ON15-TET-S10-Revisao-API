const express = require("express");
const cors = require("cors");
const app = express();
const checkInRotas = require("../src/routes/checkInRouter")


app.use(cors());
app.use(express.json());

app.use("/check-in", checkInRotas)

module.exports = app;