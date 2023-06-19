const { Model, sequelize, DataTypes } = require("../../mysql");
class sessions extends Model { }
sessions = sequelize.define('sessions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    year: {
        type: DataTypes.INTEGER,
    },
    month: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.INTEGER,
    }
}, { paranoid: true });
module.exports = sessions;