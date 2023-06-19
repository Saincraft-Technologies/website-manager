const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
const uploads = require("../systems/uploads");
class teams extends Model { };
teams = sequelize.define('teams', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    team: { type: DataTypes.STRING },
    discord: { type: DataTypes.STRING },
    facebook: { type: DataTypes.STRING },
    descriptions: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING }
}, { paranoid: true });
teams.belongsTo(websites);
websites.hasMany(teams);
teams.belongsTo(uploads);
uploads.hasMany(teams);
module.exports = teams;