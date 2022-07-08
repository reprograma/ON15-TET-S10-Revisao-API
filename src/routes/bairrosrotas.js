// dependecias
const express = require('express')
// preciso da controller
const controller = require('../controllers/bairroController')

const router = express.Router()

router.get("/estabelecimento", controller.enseada)

