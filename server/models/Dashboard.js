const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Dashboard extends Model {}

Dashboard.init({
  dashboard_id: {
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
  quantity_owned: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  average_price: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Dashboard'
});

module.exports = Dashboard;
