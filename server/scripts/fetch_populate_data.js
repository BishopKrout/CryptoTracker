// Assuming you have a file that exports your initialized Sequelize models
const { Cryptocurrency, MarketData } = require('./models'); // Update the path according to your project structure

require('dotenv').config();
const axios = require('axios');

// Function to fetch current market data from CoinGecko
async function fetchData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: { vs_currency: 'usd', order: 'market_cap_desc' },
        });
        const coins = response.data;

        for (const coin of coins) {
            // Use Sequelize's findOrCreate method to insert or find a coin
            const [crypto, created] = await Cryptocurrency.findOrCreate({
                where: { symbol: coin.symbol },
                defaults: { // Data to insert if not found
                    name: coin.name,
                    symbol: coin.symbol,
                    market_cap: coin.market_cap,
                    current_price: coin.current_price
                }
            });

            if (!created) { // If found and not created, update the existing entry
                await Cryptocurrency.update({
                    market_cap: coin.market_cap,
                    current_price: coin.current_price
                }, {
                    where: { symbol: coin.symbol }
                });
            }
        }
    } catch (error) {
        console.error('Error fetching market data:', error.message);
    }
}

// Function to fetch historical data might need adjustments based on how you plan to store and use this data

async function main() {
    await fetchData();
    // Call any other functions you need here
}

main();
