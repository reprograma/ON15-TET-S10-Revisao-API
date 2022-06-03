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
router.get("/titulo", controller.findOneEbookByTitle)

router.get('/:id', controller.findById)
router.post("/create", controller.createEbook)

module.exports = router