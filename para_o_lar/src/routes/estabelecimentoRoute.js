const express = require('express')

const controller = require("../controllers/estabelecimentosController")

const router = express.Router()

router.get('/', controller.getAll)
router.get('/cadastrados', controller.showAllEstabelecimentos),
router.post('/cadastrar', controller.createEstabelecimentos)


module.exports = router