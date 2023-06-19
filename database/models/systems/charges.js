const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const sessions = require("./sessions");
class charges extends Model { };
charges = sequelize.define('charges', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    charge: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    duration: {
        type: DataTypes.ENUM('use', 'day', 'month', 'daily', 'monthly', 'annualy'),
        allowNull: false
    }
}, { paranoid: true, modelName: 'charges' });
charges.belongsTo(sessions);
sessions.hasMany(charges);
module.exports = charges;