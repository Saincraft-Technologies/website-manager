const { UUIDV4, UUID } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("./websites");
const accounts = require("./accounts");
class payments extends Model { };
payments = sequelize.define('payments', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    receipt: {
        type: DataTypes.STRING,
        defaultValue: UUID,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
}, { paranoid: true, modelName: 'payments' });

payments.belongsTo(websites);
websites.hasMany(payments);
payments.belongsTo(accounts);
accounts.hasMany(payments);
module.exports = payments;