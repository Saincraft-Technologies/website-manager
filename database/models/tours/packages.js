const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
class packages extends Model { };
packages = sequelize.define('packages', {
    package_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: { type: DataTypes.STRING },
    caption: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    signature: { type: DataTypes.STRING },
}, { paranoid: true });
packages.belongsTo(websites);
websites.hasMany(packages);
module.exports = packages;