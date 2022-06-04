const express = require('express')


const controller = require('../controllers/estabelecimentosController')


const router = express.Router()


router.get('/catalogo', controller.findAllEstabelecimentos)
/* router.get('/catalogo/nomes', controller.findByNome)
router.get('/catalogo/enderecos', controller.findByEndereco)
router.get('/catalogo/telefones', controller.findByTelefone) */
router.post("/create", controller.createEstabelecimento)
router.patch("/update/:id", controller.updateEsbelecimento)

module.exports = router