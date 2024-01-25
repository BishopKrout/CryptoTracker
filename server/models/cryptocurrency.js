import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Cryptocurrency extends Model {
        static associate(models) {
            Cryptocurrency.hasMany(models.Transaction, { foriegnKey: 'crypto_id'});
            Cryptocurrency.hasMany(models.MarketData, { foriegnKey: 'crypto_id'});
        }
    }
    Cryptocurrnecy.init({
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


    return Cryptocurrency;
};
