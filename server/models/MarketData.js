const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class MarketData extends Model {}

MarketData.init({
  data_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  crypto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  opening_price: {
    type: DataTypes.DECIMAL(20, 4),
    allowNull: false
  },
  closing_price: {
    type: DataTypes.DECIMAL(20, 4),
    allowNull: false
  },
  high: {
    type: DataTypes.DECIMAL(20, 4),
    allowNull: false
  },
  low: {
    type: DataTypes.DECIMAL(20, 4),
    allowNull: false
  },
  volume: {
    type: DataTypes.DECIMAL(20, 4),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'MarketData'
});

module.exports = MarketData;
