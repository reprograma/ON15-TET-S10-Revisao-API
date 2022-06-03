// dependencias
const express = require('express');

//preciso da controller
const controller = require('../controllers/lojasController');

// nossas rotas
const router = express.Router();

router.get('/catalogo', controller.findAllBookstores);
router.get('/:id', controller.findById);
router.get('/nome', controller.findBookstoreByName);
router.post('/cadastrar', controller.createNewBookstore);

module.exports = router