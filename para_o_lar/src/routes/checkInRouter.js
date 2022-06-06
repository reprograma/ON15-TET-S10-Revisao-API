const express = require("express")
const controller = require("../controllers/checkInController")
const router = express.Router()

router.get("/", controller.pagInicial)
router.get("/list", controller.findAll)
router.get("/list/:id", controller.findById)
router.get("/spotName", controller.findOnePlaceByName)
router.get("/spotPayment", controller.findByPayment)
router.post("/register", controller.createPlace)
router.delete("/delete", controller.deletePlace)

module.exports = router