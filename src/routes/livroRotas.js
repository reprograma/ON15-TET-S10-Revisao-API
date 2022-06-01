<<<<<<< HEAD
// dependencias
=======
// dependecias
>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881
const express = require('express')

// preciso da controller
const controller = require('../controllers/livroController')

// nossas rotas
const router = express.Router()

<<<<<<< HEAD
// primeiro get
//          path+endpoint, controller
router.get('/biblioteca', controller.findAllEbooks)
router.get('/', controller.findOneEbookByTitle)
router.get('/:id', controller.findById)


module.exports = router

=======
// primeiro get -
//          path + endpoint | controller
/**
 * /biblioteca -> endpoint
 */
router.get('/biblioteca',      controller.findAllEbooks)
router.get("/", controller.findOneEbookByTitle)

router.get('/:id', controller.findById)


module.exports = router
>>>>>>> bc9a0fcdb58e080516f97f067b0207f7887c7881
