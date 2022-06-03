const express = require("express")
const controller = require("../controllers/shopsController")
const router = express.Router()

router.get("/loja", controller.findAllShops)
router.get("loja/:id", controller.findById)
router.post("/cadastrar", controller.createStore)

module.exports = router