require('dotenv').config({ path: './.env.test' });

const clearTestDB = require('./db/clearTestDB');

beforeEach(async () => {
    await clearTestDB();
});


module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest' // Transform JSX and JS files using babel-jest
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // Mock stylesheets
    },
    testEnvironment: 'jsdom' // Use jsdom as the test environment
  };
  


