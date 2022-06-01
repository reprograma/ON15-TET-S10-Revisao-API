const express = require("express");
const cors = require ("cors")
const pizzariaRoutes = require("./Routes/pizzariasRoutes");
//Criar a API
const app = express();


//Configurar API
app.use(express.json())
app.use(cors())

//rotas
app.use("/pizzarias", pizzariaRoutes)


// exportar (deixa publica) a nossa api
module.exports = app