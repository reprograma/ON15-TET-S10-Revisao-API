const express = require ('express')

const controller = require("../controller/estabelecimentoController")

const router = express.Router()

router.post("/cadastrar", controller.createEstabelecimentos)

router.patch("/atualizar/:id", controller.updateEstabelecimentos)







module.exports = router