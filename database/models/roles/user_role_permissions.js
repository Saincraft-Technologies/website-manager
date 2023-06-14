const { sequelize, DataTypes, Model } = require("../../mysql");
const users = require('../systems/users')
const { role_permissions } = require("./role_permissions");
class user_role_permissions extends Model { };
user_role_permissions = sequelize.define('user_role_permissions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    }
});

users.belongsToMany(role_permissions, { through: user_role_permissions });
role_permissions.belongsToMany(users, { through: user_role_permissions });
users.hasMany(user_role_permissions);
user_role_permissions.belongsTo(users);
role_permissions.hasMany(user_role_permissions);
user_role_permissions.belongsTo(role_permissions);

module.exports = user_role_permissions;