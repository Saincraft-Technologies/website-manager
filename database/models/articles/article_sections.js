const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const articles = require("./articles");
const sections = require("../sections/sections");
/** charge sections example ushuru, fine,  */
class article_sections extends Model { };
article_sections = sequelize.define('article_sections', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: { type: DataTypes.STRING },
    qty: { type: DataTypes.INTEGER },
    description: {
        type: DataTypes.STRING
    }
}, { paranoid: true });

articles.belongsToMany(sections, { through: article_sections });
sections.belongsToMany(articles, { through: article_sections });
articles.hasMany(article_sections);
article_sections.belongsTo(articles);
sections.hasMany(article_sections);
article_sections.belongsTo(sections);
module.exports = article_sections;