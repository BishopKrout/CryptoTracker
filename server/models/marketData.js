import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class MarketData extends Model {
    static associate(models) {
      // associations can be defined here
      MarketData.belongsTo(models.Cryptocurrency, { foreignKey: 'crypto_id' });
    }
  }
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

  return MarketData;
};
