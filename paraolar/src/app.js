const express = require("express");
const cors = require ("cors");
const pizzariaRoutes = require("./Routes/pizzariasRoutes");
// //Criar a API
 const app = express();


// //Configurar API
 app.use(express.json())
 app.use(cors())
 
 app.use("/pizzaria", pizzariaRoutes)

 module.exports = app