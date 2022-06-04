const express = require('express')

const controller = require('../controllers/estabelecimentoController')

const router = express.Router()

router.get('/locais', controller.findAllLocations)
router.get("/nome", controller.findOneLotionsByName)

router.get('/:id', controller.findById)
router.post("/create", controller.createLotions)

module.exports = router