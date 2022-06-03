 const express = require('express')

 const controller = require('../controllers/estabeController')

 const router = express.Router()

router.get('/estabelecimentos/', controller.findAllEstabele)
router.get('/:id', controller.findById)
router.post('/create', controller.criarLoja) 


module.exports = router