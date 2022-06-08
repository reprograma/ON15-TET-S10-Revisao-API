const controller = require("../controllers/livrariasController.js");

const express = require("express");

const router = express.Router();

router.get("/lista", controller.findAllBookStores);
router.get("/lista/:id", controller.findById);
router.get("/nameSearch", controller.findByName);
router.get("/phone", controller.accessPhonesByName);
router.get("/adress", controller.accessAdressByNameAndCity);
router.get("/payment", controller.accessPaymentOptions);
router.get("/site", controller.findSitesByName);
router.get("/likes", controller.organizeAllByLikes);

router.post("/new", controller.createNewBookStore);

router.delete("/delete/:id", controller.deleteById);

router.put("/updateAll/:id", controller.updateAll);

router.patch("/updateAdress/:id", controller.updateAdress);
router.patch("/updateItem/:id", controller.updateAnyItem);
router.patch("/likeDeslike/:id", controller.evaluateByLikeorDislike);

module.exports = router