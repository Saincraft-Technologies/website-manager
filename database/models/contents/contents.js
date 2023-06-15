const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const uploads = require("../systems/uploads");
const pages = require("../system_properties/pages");
class contents extends Model { };
contents = sequelize.define('contents', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    caption: {
        type: DataTypes.STRING,
    }
}, { paranoid: true });
contents.belongsTo(uploads);
uploads.hasMany(contents)
contents.belongsTo(pages);
pages.hasMany(contents);
module.exports = contents;