const express = require('express');
const router = express.Router();
const convertController = require('../controllers/convert');
router.get('/', convertController.getCurrencies);
router.post('/',convertController.convertir);
module.exports = router;