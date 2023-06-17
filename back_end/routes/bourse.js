const express = require('express');
const router = express.Router();
const bourseController = require('../controllers/bourse');
router.get('/', bourseController.creerBourse);
router.get('/bourses',bourseController.recupererBourses);
router.get('/:nomBourse',bourseController.recupererBourseParNom);
module.exports = router;