const express = require('express');
const router = express.Router();

const portefeuilleController = require('../controllers/portefeuille');

// Créer un nouveau portefeuille
router.post('/', portefeuilleController.ajouterPortefeuille);

// Supprimer un portefeuille
router.delete('/:id', portefeuilleController.supprimerPortefeuille);

// Modifier un portefeuille
router.put('/:id', portefeuilleController.modifierPortefeuille);
//récuperer un portefeuille par id
router.get('/:id', portefeuilleController.recupererPortefeuilleParId);
router.get('/investisseur/:id', portefeuilleController.chercherPortefeuilleParInvestisseur);
router.get('/action/:id',portefeuilleController.recupererActionParId);
router.delete('/:id/:indice',portefeuilleController.supprimerIndice);
router.put('/indice/:id',portefeuilleController.ajouterIndice);
module.exports = router;
