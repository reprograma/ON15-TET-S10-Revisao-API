const controller = require("../controllers/restaurantesController.js");

const express = require("express");

const router = express.Router();

router.get("/lista", controller.findAllRestaurants);
router.get("/lista/:id", controller.findById);
router.get("/nameSearch", controller.findByName);
router.get("/stars", controller.organizeAllByStar);
router.get("/description", controller.accessDescription);
router.get("/phone", controller.accessPhonesByName);
router.get("/adress", controller.accessAdressByName);
router.get("/specialty", controller.accessSpecialty);
router.get("/serviceType", controller.accessServiceType);
router.get("/hours", controller.accessBusinessHours);
router.get("/deliveryTime", controller.organizeAllByDeliveryTime);
router.get("/payment", controller.accessPaymentOptions);
router.get("/menu", controller.showAllMenus);
router.get("/priceAverage", controller.findAllByPriceAverage);
router.get("/deliveryFee", controller.findAllByDeliveryFee);
router.get("/ifood", controller.findIFood);

router.post("/new", controller.createNewRestaurant);

router.delete("/delete/:id", controller.deleteById);

router.put("/update/:id", controller.updateAll);

router.patch("/updateName/:id", controller.updateName);
router.patch("/updatePhone/:id", controller.updatePhone);
router.patch("/updateItems/:id", controller.updateAnyItem);
router.patch("/giveStars/:id", controller.giveStars);


module.exports = router