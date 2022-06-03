const express = require('express')

const controller = require('../controllers/livrosController')

const router = express.Router()

router.get('/biblioteca', controller.findAllEbooks)

module.exports = router
