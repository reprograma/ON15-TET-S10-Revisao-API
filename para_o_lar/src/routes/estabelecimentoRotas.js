const express = require('express')

const controller = require('../controllers/estabelecimentoController')

const router = express.Router()

router.post('/create',controller.createEstabelecimento)

module.exports = router