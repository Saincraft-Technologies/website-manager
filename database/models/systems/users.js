const { UUIDV4 } = require("sequelize");
const { Model, sequelize, DataTypes } = require("../../mysql");
const uploads = require("../systems/uploads");
const locales = require("./locales");
class users extends Model { };
users = sequelize.define('users', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.ENUM("MALE", "FEMALE"),
        defaultValue: "MALE"
    },
    birthdate: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.ENUM('none', 'verified', 'burned'),
        defaultValue: 'none'
    }
}, { paranoid: true });
/** associations */
users.belongsTo(uploads);
uploads.hasMany(users);
users.belongsTo(locales);
locales.hasMany(users);

module.exports = users;