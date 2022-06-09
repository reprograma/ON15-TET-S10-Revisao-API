const controller = require("../controllers/lispectorController.js");

const express = require("express");

const router = express.Router();

router.post("/new", controller.createNewEstablishment);
router.patch("/updateAdress/:id", controller.updateAdress);
router.patch("/like/:id", controller.likeEstablishment);
router.patch("/deslike/:id", controller.deslikeEstablishment);

module.exports = router