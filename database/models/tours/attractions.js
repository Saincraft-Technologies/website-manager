const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
class attractions extends Model { };
/** attraction available in the site! */
attractions = sequelize.define('attractions', {
    id: {
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