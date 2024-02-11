// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}
User.init({
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password_hash: DataTypes.STRING,
  date_joined: DataTypes.DATE
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false
});

module.exports = User;
