
const express = require('express')


const controller = require('../controllers/estabelecimentoscontrollers.js')


const router = express.Router()


router.get('/comerciolocal', controller.findAllEstablishment)


module.exports = router