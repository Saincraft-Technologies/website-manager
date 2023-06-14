const { Model, sequelize, DataTypes } = require("../../mysql");
class permissions extends Model { };
permissions = sequelize.define('permissions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    permission: {
        type: DataTypes.ENUM('all', 'read', 'write', 'delete'),
        allowNull: false
    },
    descriptions: {
        type: DataTypes.STRING,
    }
}, { paranoid: true });
module.exports = permissions;
