const express = require("express")
const cors = require("cors")
const app = express()
const livrosRoutes = require("./routes/livroRouter")

app.use(express.json())
app.use(cors())

app.use("/livros", livrosRoutes)



module.exports = app