const express = require('express');
const router = express.Router();
const bourseController = require('../controllers/bourse');
router.get('/', bourseController.createBourse);
router.get('/bourses',bourseController.getAllBourses);
router.get('/:nomBourse',bourseController.getBourseByName);
module.exports = router;