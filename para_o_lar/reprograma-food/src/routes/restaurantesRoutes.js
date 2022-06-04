const controller = require("../controllers/restaurantesController.js");

const express = require("express");

const router = express.Router();

router.get("/lista", controller.findAllRestaurants);
router.get("/lista/:id", controller.findById);
router.get("/nameSearch", controller.findByName);
router.get("/stars", controller.organizeAllByStar);
router.get("/description", controller.getAllWithDescription);
router.get("/phone", controller.getAllWithPhone);
router.get("/adress", controller.getAllWithAdress);
router.get("/specialty", controller.getAllWithSpecialty);
router.get("/serviceType", controller.getAllWithServiceType);
router.get("/hours", controller.getAllWithOpeningHours);
router.get("/deliveryTime", controller.organizeAllByDeliveryTime);
router.get("/payment", controller.getAllWithPaymentOptions);
router.get("/menu", controller.showAllMenus);
router.get("/priceAverage", controller.findAllByPriceAverage);
router.get("/deliveryFee", controller.findAllByDeliveryFee);
router.get("/ifood", controller.findIFood);

router.post("/new", controller.createNewRestaurant);

router.delete("/delete/:id", controller.deleteById);

router.put("/update/:id", controller.updateAll);

router.patch("/updateName/:id", controller.updateName);
router.patch("/updatePhone/:id", controller.updatePhone);
router.patch("/updateItems/:id", controller.updateItems);
router.patch("/giveStars/:id", controller.giveStars);


module.exports = router