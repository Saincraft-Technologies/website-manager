const { Model, sequelize, DataTypes } = require("../../mysql");
const users = require("./users");
const businesses = require("../businesses/businesses");
class websites extends Model { };
websites = sequelize.define('websites', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dns: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    app_secret: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ip_address: {
        type: DataTypes.STRING,
    },
    response_format: {
        type: DataTypes.ENUM('json', 'xml'),
        defaultValue: 'json'
    }
}, { paranoid: true });
websites.belongsTo(businesses);
businesses.hasMany(websites);
module.exports = websites;
