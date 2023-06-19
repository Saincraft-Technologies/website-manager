const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const methods = require("./methods");
class accounts extends Model { };
accounts = sequelize.define('accounts', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    account: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    acc_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { paranoid: true, modelName: 'accounts' });
accounts.belongsTo(methods);
methods.hasMany(accounts);
module.exports = accounts;