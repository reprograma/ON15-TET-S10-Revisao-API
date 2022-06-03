const controller = require("../controllers/decoraçãoStoreController.js")

const express = require('express')

const router = express.Router()

router.get("/busca", controller.getAllStore)

router.get("/busca/:id", controller.getById)

router.get("/filtro", controller.getByName)

router.post("/cadastrar", controller.createStore)

router.patch("/updateEndereco", controller.updateEndereco)


module.exports = router