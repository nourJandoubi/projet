
const express = require('express');
const router = express.Router();
const actionController = require('../controllers/action');

router.get('/', actionController.getAllActions);
router.get('/:id', actionController.getOneAction);
router.put('/:id', actionController.modifyAction);
router.delete('/:id', actionController.deleteAction);

module.exports = router;