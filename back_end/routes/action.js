
const express = require('express');
const router = express.Router();
const actionController = require('../controllers/action');
router.get('/', actionController.getAllActions);
// router.get('/:location/:pageNumber', actionController.getAllActions);
//router.get('/:bourse', actionController.getActionsParBourse);
router.post('/', actionController.stockPricesToDatabase);
router.post('/oldStock',actionController.oldstockPricesToJson)
module.exports = router;