
const express = require('express');
const router = express.Router();
const actionController = require('../controllers/action');
router.get('/', actionController.getAllActions);
router.get('/:id',actionController.getActionById);
router.get('/entreprise/:idEntreprise',actionController.getActionByEntreprise);
router.post('/acheter', actionController.acheterAction);
router.post('/vendre', actionController.vendreAction);
// router.get('/:location/:pageNumber', actionController.getAllActions);
//router.get('/:bourse', actionController.getActionsParBourse);
//router.post('/', actionController.stockPricesToDatabase);
//router.post('/oldStock',actionController.oldstockPricesToJson);
module.exports = router;