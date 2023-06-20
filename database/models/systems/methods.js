const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
class methods extends Model { };
methods = sequelize.define('methods', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    method: {
        type: DataTypes.ENUM('MOBILE-MONEY', 'BANK', 'CASH','E-PAYMENT'),
        allowNull: false,
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receipt_length: {
        type: DataTypes.INTEGER
    }
}, { paranoid: true, modelName: 'methods' });
module.exports = methods;