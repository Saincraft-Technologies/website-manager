const { Model, DataTypes, sequelize } = require("../../mysql");
const uploads = require("../systems/uploads");
/** charge item gari, nyama,  */
class sections extends Model { };
sections = sequelize.define('sections', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    section: { type: DataTypes.STRING },
    caption: { type: DataTypes.STRING }
}, { paranoid: true });
sections.belongsTo(uploads);
uploads.hasMany(sections);
module.exports = sections;