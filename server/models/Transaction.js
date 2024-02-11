const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Transaction extends Model {}

Transaction.init({
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  crypto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  transaction_type: {
    type: DataTypes.ENUM('BUY', 'SELL'),
    allowNull: false
  },
  transaction_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Transaction'
});

module.exports = Transaction;
