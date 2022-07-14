const express = require("express")


const controller = require("../controllers/estabelecimentosController")


const router = express.Router()


router.get("/getAll", controller.getAllEstabelecimentos)
router.post("/createMovie", controller.createMovieEstabelecimento)
router.patch("/atualizarEnd/:id", controller.AtualizarEndEsbelecimento)

module.exports = router 