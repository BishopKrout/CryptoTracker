const pool = require('../server/config/db'); // Adjust the path to your db config

async function clearTestDB() {
    await pool.query('TRUNCATE TABLE users CASCADE;');
    // Add similar statements for other tables as necessary
}

module.exports = clearTestDB;
