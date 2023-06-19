const { sequelize, DataTypes, Model } = require("../../mysql");
const usages = require("../systems/usages");
const charges = require("../systems/charges");
const websites = require("./websites");
const { UUIDV4 } = require("sequelize");
const sessions = require("./sessions");
const users = require("./users");
class bills extends Model { };
bills = sequelize.define('bills', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
    }
}, { paranoid: true });

charges.belongsToMany(usages, { through: bills });
usages.belongsToMany(charges, { through: bills });
charges.hasMany(bills);
usages.hasMany(bills);
bills.belongsTo(charges);
bills.belongsTo(usages);
bills.belongsTo(websites);
websites.hasMany(bills);
bills.belongsTo(sessions);
sessions.hasMany(bills);
bills.belongsTo(users);
users.hasMany(bills);

module.exports = bills;