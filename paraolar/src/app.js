const express = require("express")
const cors = require("cors")
const businessRoutes = require("./routes/businessRoutes")
const app = express() 

app.use(express.json())
app.use(cors())


app.use("/stores", businessRoutes)

module.exports = app