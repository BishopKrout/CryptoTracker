require('dotenv').config();
const axios = require('axios');
const { Pool } = require('pg');

const pool = new Pool(); //config with .env variable

// Fucntion to fetch current market data form CoinGecko
async function fetchData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: { vs_currency: 'usd', order: 'market_cap_desc' },
        });
        const coins = response.data;

        for (const coin of coins) {
            // Insert or update each coin data into cryptocurrencies table
            await pool.query(`
                INSERT INTO cryptocurrencies (name, symbol, market_cap, curent_price)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (symbol) DO
                UPDATE SET market_cap = $3, current_price = $4`,
                [coin.name, coin.symbol, coin.market_cap, coin.current_price]);
        }
    } catch (error) {
        console.error('Error fetching market data:', error.message);
    }
}

// Fetches historical market data for a specific coin from CoinGecko
async function fetchHistoricalDataForCoin(coinId) {
    try {
        const days = 30; // Days of historical data to fetch
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
            params: { vs_currency: 'usd', days: days },
        });
        const marketData = response.data.prices;

        for (const dataPoint of marketData) {
            const [timestamp, price] = dataPoint;
            const date = new Date(timestamp);
            await pool.query(`
                INSERT INTO market_data (crypto_id, date, opening_price, closing_price, high, low, volume)
                VALUES ((SELECT crypto_id FROM cryptocurrencies WHERE symbol = $1), $2, $3, $3, $3, $3, 0)
                ON CONFLICT (crypto_id, date) DO NOTHING`, 
                [coinId, date, price]);
        }
    } catch (error) {
        console.error(`Error fetching historical data for ${coinId}:`, error.message);
    }
}

// Main execution function
async function main() {
    await fetchHistoricalDataForCoin('bitcoin');
    await fetchHistoricalDataForCoin('ethereum');
}

//Start the script
main();