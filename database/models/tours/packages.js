const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
const attenaries = require("./itineraries");
const attractions = require("./attractions");
class packages extends Model { };
/** package provided by business! */
packages = sequelize.define('packages', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    package: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    caption: { type: DataTypes.STRING },
}, { paranoid: true });
packages.belongsTo(websites);
websites.hasMany(packages);
attractions.belongsToMany(attenaries, { through: packages });
attenaries.belongsToMany(attractions, { through: packages });
attractions.hasMany(packages);
attenaries.hasMany(packages);
packages.belongsTo(attractions);
packages.belongsTo(attenaries);
module.exports = packages;