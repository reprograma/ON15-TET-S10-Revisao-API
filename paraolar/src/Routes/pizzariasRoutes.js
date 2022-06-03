
 const controller = require("../Controller/pizzariasController")
 const express= require("express")
 const router = express.Router()

// // PRIMEIRO GET
 router.get("/buscar",controller.getAllPizzarias)
 router.get("/buscar/:id", controller.getById)
 router.get("/buscarNome", controller.getByName) //query.name
 router.get("/buscarEndereco", controller.getByAdress ) //query.adress
 router.get ("/buscarContato", controller.getByContact) //query.contact
 router.post ("/cadastrar", controller.createPizzaria)


 module.exports = router