const { Model, DataTypes, sequelize } = require("../../mysql");
const uploads  = require("../systems/uploads");
const teams = require("./teams");
class members extends Model { };
members = sequelize.define('members', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    member: { type: DataTypes.STRING },
    position: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    facebook: { type: DataTypes.STRING },
    tweeter: { type: DataTypes.STRING },
    linkedIn: { type: DataTypes.STRING },
    instagram: { type: DataTypes.STRING },
    tiktock: { type: DataTypes.STRING },
    discord: { type: DataTypes.STRING },
    youtube: { type: DataTypes.STRING },
    biography: { type: DataTypes.TEXT },
    comment: { type: DataTypes.TEXT },
    site_visibility: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { paranoid: true });
members.belongsTo(teams);
teams.hasMany(members);
members.belongsTo(uploads);
uploads.hasMany(members);
module.exports = members;