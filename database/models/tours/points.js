const { Model, DataTypes, sequelize } = require("../../mysql");
class points extends Model { };
/** stoping points in the circuit */
points = sequelize.define('points', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    point: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    long:{type:DataTypes.DOUBLE},
    lat:{type:DataTypes.DOUBLE},
}, { paranoid: true });
module.exports = points;