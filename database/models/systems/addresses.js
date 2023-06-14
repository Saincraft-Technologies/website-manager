const { Model, DataTypes, sequelize } = require("../../mysql");
const regions = require("./regions");
class addresses extends Model { };
addresses = sequelize.define('addresses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    address: { type: DataTypes.STRING },
    long: { type: DataTypes.STRING },
    lat: { type: DataTypes.STRING },
}, { paranoid: true });
addresses.belongsTo(regions);
regions.hasMany(addresses);
module.exports = addresses;