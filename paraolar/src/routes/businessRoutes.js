const express = require("express") 
const router = express.Router()
const controller = require("../controllers/businessControllers")

router.get("/", controller.getAll)
router.get("/list", controller.findSome)
router.get("/:id", controller.getById)
router.post("/add", controller.createStore)


module.exports = router