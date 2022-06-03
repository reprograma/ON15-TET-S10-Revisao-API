const express = require("express") //importa dependencias
const app = express() //cria a api
const cors = require("cors")
const livrosRoutes = require("./routes/livroRoutes")

//configurar api
app.use(express.json())
app.use(cors())

//rotas
app.use("/livros", livrosRoutes)

//exportar (deixar publica) a api
module.exports = app