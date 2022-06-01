
const controller = require("../Controller/pizzariasController")
const express= require("express")
const { router } = require("../app")
const router = express.routes()

// PRIMEIRO GET
router.get("/biblioteca",controller.getAllPizzarias)
router.get("/:id", controller.getById)
router.get("/", controller.getOneByname)
router.get("/", controller.getByAdress )
router.get ("", controller. getByContacty)
router.post ("/cadastrar", controller.createPizzaria)