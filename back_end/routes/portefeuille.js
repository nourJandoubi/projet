const express = require('express');
const router = express.Router();
const portefeuilleController = require('../controllers/portefeuille');

router.post('/', portefeuilleController.ajouterPortefeuille);
router.delete('/:id', portefeuilleController.supprimerPortefeuille);
router.put('/:id', portefeuilleController.modifierPortefeuille);
router.get('/:id', portefeuilleController.recupererPortefeuilleParId);
router.get('/investisseur/:id', portefeuilleController.chercherPortefeuilleParInvestisseur);
router.delete('/:id/:indice',portefeuilleController.supprimerIndice);
router.put('/indice/:id',portefeuilleController.ajouterIndice);
module.exports = router;
