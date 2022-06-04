/*
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

const express = require("express")
const router = express.Router()
const controller = require("../controller/livroControllers")

// path = / , endpoint = biblioteca
router.get("/biblioteca", controller.findAll)
router.get("/", controller.findOneEbookByTitle)
router.get("/:id", controller,controller.findById)
router.post("/criar", controller.createEbook)


module.exports = router