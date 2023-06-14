const { Model, Sequelize, sequelize } = require("../../mysql");
class countries extends Model { };
countries = sequelize.define('countries', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    initial: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zip: {
        type: Sequelize.STRING,
    }

}, { paranoid: true });
module.exports = countries;