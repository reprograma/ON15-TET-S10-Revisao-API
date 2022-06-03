const express = require("express")
const router = express.Router()
const controller = require("../controller/livroControllers")

// path = / , endpoint = biblioteca
router.get("/biblioteca", controller.findAll)
router.get("/", controller.findOneEbookByTitle)
router.get("/:id", controller,controller.findById)
router.post("/criar", controller.createEbook)


module.exports = router