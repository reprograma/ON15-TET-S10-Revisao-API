const express = require("express")
const controller = require("../controllers/livroController")
const router = express.Router()

router.get("/biblioteca", controller.findAllEbooks)
router.get("/", controller.findOneEbookByTitle)
router.get("/:id", controller.findById)
module.exports = router