const express = require("express");
const cors = require("cors");
const livrariaRoutes = require('./routes/livrariaRoutes')

const app = express();


app.use(cors());
app.use(express.json());

app.use("/livrarias", livrariaRoutes)


module.exports = app 