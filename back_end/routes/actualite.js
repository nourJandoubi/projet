
const express = require('express');
const router = express.Router();
const actualiteController = require('../controllers/actualite');

router.get('/', actualiteController.getAllActualites);
router.post('/', actualiteController.createActualite);
router.get('/:id', actualiteController.getOneActualite);
router.put('/:id', actualiteController.modifyActualite);
router.delete('/:id', actualiteController.deleteActualite);

module.exports = router;