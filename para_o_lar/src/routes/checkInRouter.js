const express = require("express")
const controller = require("../controllers/checkInController")
const router = express.Router()

router.get("/", controller.pagInicial)
router.get("/buscar", controller.findAll)
router.get("/lugar", controller.findOneLocalByName)
router.get("/:id", controller.findById)
router.post("/cadastrar", controller.createLocal)

module.exports = router