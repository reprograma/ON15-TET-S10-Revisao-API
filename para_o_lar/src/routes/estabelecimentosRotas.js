const express = require('express')
const router = express.Router()
const controllers = require('../controllers/estabelecimentosControllers')


router.get('/',controllers.findAllStore)
router.get('/buscar',controllers.findStoreByQuery)
router.get('/buscar/:id',controllers.findStoreById)
router.post('/adicionar',controllers.createStore)
router.patch('/atualizar/:id',controllers.updateAddressStore)
router.get('/avaliar',controllers.like)


module.exports = router

