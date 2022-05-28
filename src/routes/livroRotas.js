// dependecias
const express = require('express')

// preciso da controller
const controller = require('../controllers/livroController')

// nossas rotas
const router = express.Router()

// primeiro get -
//          path + endpoint | controller
/**
 * /biblioteca -> endpoint
 */
router.get('/biblioteca',      controller.findAllEbooks)

module.exports = router