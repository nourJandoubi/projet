const express = require('express');
const router = express.Router();
const historiquePortefeuilleController = require('../controllers/historiquePortefeuille');

router.get('/actionsAchtees/:id',historiquePortefeuilleController.recupererActionsAchetees);
router.get('/actionsVendues/:id',historiquePortefeuilleController.recupererActionsVendues);
router.get('/actionsPortefeuille/:id',historiquePortefeuilleController.recupererActionsParPortefeuille);
router.post('/pourcentageParAction',historiquePortefeuilleController.calculerPourcentageParAction);
router.post('/gainPerte',historiquePortefeuilleController.calculerGainPerte);
module.exports = router;
