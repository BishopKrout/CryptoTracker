const express = require('express');
const axios = require('axios');
const router = express.Router();


let cache = {
    data: null,
    lastFetch: 0
};

router.get('/markets', async (req, res) => {
    const THIRTY_MINUTES = 30 * 60 * 1000; //30 min in milliseconds
    if (cache.data && (Date.now() - cache.lastFetch) < THIRTY_MINUTES) {
        return res.json(cache.data); //send data
    }
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,  // Number of results
                page: 1
            }
        });
        cache.data = response.data;
        cache.lastFetch= Date.now();
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

module.exports = router;
