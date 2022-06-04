const express = require('express')
const controller = require('../controllers/estabelecimentoController')
const router = express.Router()
router.get('/membros', controller.findAllMembers);
router.get("/nome", controller.findOneByName)
router.get('/:id', controller.findById)
router.post("/cadastro", controller.createMembers)
module.exports = router
