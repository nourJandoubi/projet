const express = require('express');
const router = express.Router();
const indiceController = require('../controllers/indice');
 router.post('/',indiceController.createIndice);
 router.get('/',indiceController.getAllIndices);
 router.get('/:nom',indiceController.getOneIndice);
 module.exports = router;