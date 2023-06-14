const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const countries = require("./countries");
class contacts extends Model { };
contacts = sequelize.define('contacts', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    verified_number: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    verified_email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, { paranoid: true, modelName: 'contacts' });
contacts.belongsTo(countries);
countries.hasMany(contacts);
module.exports = contacts;