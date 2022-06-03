const express = require('express')

const controller = require('../controllers/estabelecimentosController')

const router = express.Router()

router.get("/todos", controller.getAll)
router.post("/cadastrar", controller.createEstablishment)


module.exports = router



