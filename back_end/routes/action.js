
const express = require('express');
const router = express.Router();
const actionController = require('../controllers/action');
router.get('/', actionController.getAllActions);
// router.get('/:location/:pageNumber', actionController.getAllActions);
router.get('/:bourse', actionController.getActionsParBourse);
module.exports = router;