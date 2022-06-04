const express = require("express") 
const router = express.Router()
const controller = require("../controllers/businessControllers")

router.get("/", controller.getAll)
router.get("/list", controller.findSome)
router.get("/:id", controller.getById)
router.post("/add", controller.createStore)
router.patch("/update/:id", controller.updateStore)
// router.patch("like/:id", controller.updateLikes)
router.put("/change/:id", controller.changeStore)
router.delete("/delete/:id", controller.deleteStore)


module.exports = router 