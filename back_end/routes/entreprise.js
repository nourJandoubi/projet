const express = require('express');
const router = express.Router();
const entrepriseController = require('../controllers/entreprise');

router.get('/', entrepriseController.getAllEntreprises);
router.get('/:nom', entrepriseController.getOneEntreprise);
router.get('/nomEntreprise/:id',entrepriseController.getOneEntrepriseById);
router.get('/secteurs/liste',entrepriseController.getAllSecteur);
router.post('/Bourse/Secteur',entrepriseController.getActionByBourseAndSecteur);
//router.post('/', entrepriseController.createEntreprise);
// router.put('/',entrepriseController.updateEntreprisesFromAPI);
//router.post('/json',entrepriseController.createEntreprisesFromJSON);
//router.put('/', entrepriseController.updateEntreprisesSansNom);
//router.delete('/entreprise', entrepriseController.deleteEntreprises);
module.exports = router;                               