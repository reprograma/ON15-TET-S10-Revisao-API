const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const restauranteRoutes = require("./routes/restaurantesRoutes.js");

app.use("/restaurantes", restauranteRoutes)

module.exports = app