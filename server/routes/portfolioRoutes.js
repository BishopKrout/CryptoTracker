const express = require('express');
const router = express.Router();
const { getPortfolio, addCryptoToPortfolio } = require('../controllers/portfolioController');
const { authenticateToken } = require('../middleware/authenticateToken'); // Assuming you have this middleware

router.get('/', authenticateToken, getPortfolio);
router.post('/', authenticateToken, addCryptoToPortfolio);

module.exports = router;
