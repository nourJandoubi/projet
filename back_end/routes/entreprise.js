const express = require('express');
const router = express.Router();
const entrepriseController = require('../controllers/entreprise');

router.get('/', entrepriseController.recupererEntreprises);
router.get('/:nom', entrepriseController.recupererEntrepriseParNom);
router.get('/nomEntreprise/:id',entrepriseController.recupererEntrepriseParId);
router.get('/secteurs/liste',entrepriseController.recupererSecteurs);
router.post('/Bourse/Secteur',entrepriseController.recupererEntrepriseParBourseEtSecteur);
//router.post('/', entrepriseController.createEntreprise);
// router.put('/',entrepriseController.updateEntreprisesFromAPI);
//router.post('/json',entrepriseController.createEntreprisesFromJSON);
//router.put('/', entrepriseController.updateEntreprisesSansNom);
//router.delete('/entreprise', entrepriseController.deleteEntreprises);
module.exports = router;                               