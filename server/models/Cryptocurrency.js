// server/models/Cryptocurrency.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // ensure this path is correct

class Cryptocurrency extends Model {}

Cryptocurrency.init({
  crypto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  symbol: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  market_cap: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: true // assuming market cap can be null
  },
  current_price: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: true // assuming current price can be null
  }
}, {
  sequelize,
  modelName: 'Cryptocurrency',
  tableName: 'cryptocurrencies', // Use the exact table name here
  timestamps: false // if you don't have createdAt and updatedAt columns
});

module.exports = Cryptocurrency;
