const { Model, sequelize, DataTypes } = require("../../mysql");
class roles extends Model { }
roles = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'generic',
    },
}, { paranoid: true });
module.exports = roles;