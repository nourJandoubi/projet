const express = require('express');
const router = express.Router();
const indiceController = require('../controllers/indice');
 router.post('/',indiceController.creerIndice);
 router.get('/',indiceController.recupererIndices);
 router.get('/:nom',indiceController.recupererIndiceParNom);
 module.exports = router;