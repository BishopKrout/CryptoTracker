require('dotenv').config({ path: './.env.test' });

const clearTestDB = require('./db/clearTestDB');

beforeEach(async () => {
    await clearTestDB();
});


