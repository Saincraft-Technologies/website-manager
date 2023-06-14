const { sequelize, DataTypes, Model } = require("../../mysql");

const permissions = require('../systems/permissions')
const roles = require('../systems/roles')
class role_permissions extends Model { };
role_permissions = sequelize.define('role_permissions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    handler:{
        type:DataTypes.STRING,
    }
}, { paranoid: true });

roles.belongsToMany(permissions, { through: role_permissions });
permissions.belongsToMany(roles, { through: role_permissions });
role_permissions.belongsTo(roles);
roles.hasMany(role_permissions);
role_permissions.belongsTo(permissions);
permissions.hasMany(role_permissions)

const hooks = {
    afterCreate: (Role, payload) => {
        AddRolePermission(Role, payload);
    }
}

function AddRolePermission(Role, payload) {
    let InsertArr = {
        roleId: Role.id,
        permissionId: 5
    }
    model.role_permission.create(InsertArr);
}
module.exports = { hooks, role_permissions };