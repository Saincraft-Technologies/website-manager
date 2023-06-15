const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
class pages extends Model { };
pages = sequelize.define('pages', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    page_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    caption: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    }
}, { paranoid: true });
module.exports = pages;