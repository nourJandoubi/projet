const express = require('express');
const router = express.Router();
const entrepriseController = require('../controllers/entreprise');

router.get('/', entrepriseController.getAllEntreprises);
router.get('/:nom', entrepriseController.getOneEntreprise);
//router.post('/', entrepriseController.createEntreprise);
// router.put('/',entrepriseController.updateEntreprisesFromAPI);
//router.post('/json',entrepriseController.createEntreprisesFromJSON);
//router.put('/', entrepriseController.updateEntreprisesSansNom);
//router.delete('/entreprise', entrepriseController.deleteEntreprises);
module.exports = router;