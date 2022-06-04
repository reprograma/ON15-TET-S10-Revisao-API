const controller = require("../controllers/livrariasController.js");

const express = require("express");

const router = express.Router();

router.get("/lista", controller.findAllBookStores);
router.get("/lista/:id", controller.findById);
router.get("/nameSearch", controller.findByName);
router.get("/phone", controller.getAllWithPhone);
router.get("/adress", controller.getAllWithAdress);
router.get("/payment", controller.getAllWithPaymentOptions);
router.get("/site", controller.findSite);
router.get("/likes", controller.organizeAllLikes);

router.post("/new", controller.createNewBookStore);

router.delete("/delete/:id", controller.deleteById);

router.put("/updateAll/:id", controller.updateAll);

router.patch("/updateAdress/:id", controller.updateAdress);
router.patch("/updateItem/:id", controller.updateItems);
router.patch("/likeDeslike/:id", controller.LikeorDeslike);

module.exports = router