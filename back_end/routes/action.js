
const express = require('express');
const router = express.Router();
const actionController = require('../controllers/action');

router.get('/:location/:pageNumber', actionController.getAllActions);
router.get('/:bourse', actionController.getActionsParBourse);
router.put('/:id', actionController.modifyAction);
router.delete('/:id', actionController.deleteAction);

module.exports = router;