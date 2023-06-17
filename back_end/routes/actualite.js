
const express = require('express');
const router = express.Router();
const actualiteController = require('../controllers/actualite');

router.get('/', actualiteController.getAllActualites);
router.post('/', actualiteController.createActualite);
router.get('/:id', actualiteController.getOneActualite);


module.exports = router;