import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Transaction extends Model {
        static associate(models) {
            Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
            Transaction.belongsTo(models.Cryptocurrency, { foreignKey: 'crypto_id' });
        }
    }
    Transaction.init({
        trabsaction_id: {
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

    return Transaction;
};