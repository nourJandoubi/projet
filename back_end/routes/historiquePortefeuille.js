const express = require('express');
const router = express.Router();

const historiquePortefeuilleController = require('../controllers/historiquePortefeuille');
// Acheter une action
router.post('/acheter', historiquePortefeuilleController.acheterAction);
//vendre une action
router.post('/vendre', historiquePortefeuilleController.vendreAction);
// Supprimer une entrée d'historique de portefeuille
router.delete('/:id', historiquePortefeuilleController.supprimerHistorique);
//recuperer liste action acheter
router.get('/actionsAchtees/:id',historiquePortefeuilleController.recupererActionsAchetees);
//recuperer liste action vendues
router.get('/actionsVendues/:id',historiquePortefeuilleController.recupererActionsVendues);
//recuperer liste action par portefeuille
router.get('/actionsPortefeuille/:id',historiquePortefeuilleController.recupererActionsParPortefeuille);

router.post('/pourcentageParAction',historiquePortefeuilleController.calculerPourcentageParAction);
router.post('/pourcentageLiquidite',historiquePortefeuilleController.calculerPourcentageLiquidite);
router.post('/gainPerte',historiquePortefeuilleController.calculerGainPerte);
module.exports = router;
