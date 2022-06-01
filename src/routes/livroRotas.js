// dependencias
const express= require("express")
const router = express.Router()


//nossas rotas
const routes = express.Router()
// preciso do controller
const controller = require("../controller/livrosController")

// PRIMEIRO GET
router.get("/biblioteca",controller.findAllEbooks)
router.get("/:id", controller.findById)
router.get("/", controller.findOneByTitle)
//preciso obter todos os livros



// preciso de um livro por id


//