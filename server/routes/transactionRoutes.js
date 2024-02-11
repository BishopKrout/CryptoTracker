const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Buy asset
router.post('/buy', transactionController.buyAsset);

// Sell asset
router.post('/sell', transactionController.sellAsset);

module.exports = router;
