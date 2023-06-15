const { sequelize, DataTypes, Model } = require("../../mysql");
const sections = require("../sections/sections");
const contents = require("../contents/contents");
class content_sections extends Model { };
content_sections = sequelize.define('content_sections', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    paragraph: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { paranoid: true });

contents.belongsToMany(sections, { through: content_sections });
sections.belongsToMany(contents, { through: content_sections });
contents.hasMany(content_sections);
sections.hasMany(content_sections);
content_sections.belongsTo(contents);
content_sections.belongsTo(sections);

module.exports = content_sections;