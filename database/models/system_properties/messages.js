const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
class messages extends Model { };
messages = sequelize.define('messages', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING
    }
}, { paranoid: true });
messages.belongsTo(websites);
websites.hasMany(messages);
module.exports = messages;