const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
class reactions extends Model { };
reactions = sequelize.define('reactions', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    reaction: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
    },
    positive: {
        type: DataTypes.BOOLEAN,
    }
}, { paranoid: true });
module.exports = reactions;