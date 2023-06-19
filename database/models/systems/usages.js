const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("./websites");
const sessions = require("./sessions");
class usages extends Model { };
usages = sequelize.define('usages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usage: {
        type: DataTypes.ENUM('UPDATE', 'ENTRY', 'DELETE', 'SAVE', 'UPLOAD', 'DOWNLOAD', 'DEF')
    },
    definition: {
        type: DataTypes.STRING,
    }
}, { paranoid: true });
usages.belongsTo(websites);
websites.hasMany(usages);
usages.belongsTo(sessions);
sessions.hasMany(usages);
module.exports = usages;