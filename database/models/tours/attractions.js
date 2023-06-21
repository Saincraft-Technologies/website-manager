const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
class attractions extends Model { };
attractions = sequelize.define('attractions', {
    attraction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    attraction: { type: DataTypes.STRING },
    descriptions: { type: DataTypes.TEXT },
}, { paranoid: true });
attractions.belongsTo(websites);
websites.hasMany(attractions);
module.exports = attractions;