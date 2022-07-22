const express = require('express')
const router = express.Router()
const controller = require('../controller/estabelecimentos')


router.get("/listar", controller.listarEstabelecimentos)
router.post("/cadastrar", controller.cadastrarEstabelecimento)

module.exports = router