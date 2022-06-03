const express = require('express')

const controller = require('../controllers/livrariaController')

const router = express.Router()

router.get('/servidor', controller.findAllBookstores)
router.get('/nome', controller.findOneBookstoreByName)
router.get('/:id', controller.findById)
router.post('/cadastrar', controller.createBookstore)

module.exports = router 