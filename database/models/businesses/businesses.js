const { Model, DataTypes, sequelize } = require("../../mysql");
const users = require('../systems/users');
const uploads = require('../systems/uploads');
class businesses extends Model { };
businesses = sequelize.define('businesses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    facebook: { type: DataTypes.STRING },
    tweeter: { type: DataTypes.STRING },
    instagram: { type: DataTypes.STRING },
    linkedIn: { type: DataTypes.STRING }
}, { paranoid: true });
businesses.belongsTo(users);
users.hasMany(businesses);
businesses.belongsTo(uploads);
uploads.hasMany(businesses);
module.exports = businesses;