// models/index.js
const User = require('./User');
const Transaction = require('./Transaction');
const MarketData = require('./MarketData');
const Cryptocurrency = require('./Cryptocurrency');
const Dashboard = require('./Dashboard');

module.exports = {
  User,
  Transaction,
  MarketData,
  Cryptocurrency,
  Dashboard
};
