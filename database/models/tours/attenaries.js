const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
class attenaries extends Model { };
attenaries = sequelize.define('attenaries', {
    attenary_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    attenary: { type: DataTypes.STRING },
    descriptions: { type: DataTypes.TEXT },
}, { paranoid: true });
attenaries.belongsTo(websites);
websites.hasMany(attenaries);
module.exports = attenaries;