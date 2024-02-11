const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Cryptocurrency extends Model {}

Cryptocurrency.init({
  crypto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  market_cap: {
    type: DataTypes.DECIMAL(20, 4)
  },
  current_price: {
    type: DataTypes.DECIMAL(20, 4)
  }
}, {
  sequelize,
  modelName: 'Cryptocurrency'
});

module.exports = Cryptocurrency;
