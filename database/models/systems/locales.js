const { Model, sequelize, DataTypes } = require("../../mysql");
class locales extends Model { };
locales = sequelize.define('locales', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(3),
        defaultValue: 'US',
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        defaultValue: 'english',
        allowNull: false
    },
    language_abbr: {
        type: DataTypes.STRING(''),
        defaultValue: 'en',
        allowNull: false
    },
    horizontalAlignment: {
        type: DataTypes.ENUM('right-side', 'left-side'),
        defaultValue: 'left-side'
    },
    verticalAlignment: {
        type: DataTypes.ENUM('top-to-bottom', 'bottom-to-top'),
        defaultValue: 'top-to-bottom'
    },
    isSpecialCharacter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, { paranoid: true });
module.exports = locales;
