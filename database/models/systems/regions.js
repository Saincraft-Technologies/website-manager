const { Model, Sequelize, sequelize } = require("../../mysql");
class regions extends Model { };
regions = sequelize.define('regions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, { paranoid: true });
module.exports = regions;