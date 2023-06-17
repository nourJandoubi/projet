
const express = require('express');
const router = express.Router();
const deviseController = require('../controllers/devise');

router.get('/', deviseController.getAllDevises);
router.get('/D', deviseController.getDevisesParDate);
router.post('/', deviseController.createDevise);
router.get('/:id', deviseController.getOneDevise);
router.put('/:id', deviseController.modifyDevise);
router.delete('/:id', deviseController.deleteDevise);

module.exports = router;