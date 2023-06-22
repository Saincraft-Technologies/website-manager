const { Model, DataTypes, sequelize } = require("../../mysql");
class provisions extends Model { };
/** stoping provisions in the circuit */
provisions = sequelize.define('provisions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    provision: { type: DataTypes.STRING },
    cost: { type: DataTypes.DOUBLE },
    provider: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
}, { paranoid: true });
module.exports = provisions;