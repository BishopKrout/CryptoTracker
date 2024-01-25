const pool = require('../server/config/db'); // Adjust the path to your db config

async function prepareTestDB() {
    await pool.query("INSERT INTO users (username, email, password_hash) VALUES ('testUser', 'test@example.com', '$2b$10$g5sTYRPQbFXaNB3Wn3MrVOqrhLkh1av//fLnbRrIJTmvCn1n1EfqW')");
    // Add similar statements for other tables as necessary
}

module.exports = prepareTestDB;