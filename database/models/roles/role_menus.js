const { sequelize, DataTypes, Model } = require("../../mysql");
const menus = require('../systems/menus')
const roles = require('../systems/roles')
class role_menus extends Model { };
role_menus = sequelize.define('role_menus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
});

roles.belongsToMany(menus, { through: role_menus });
menus.belongsToMany(roles, { through: role_menus });

menus.hasMany(role_menus);
role_menus.belongsTo(menus);
roles.hasMany(role_menus);
role_menus.belongsTo(roles);

const hooks = {
    afterCreate: (Role, payload) => {
        AddRoleMenu(Role, payload);
    }
}

function AddRoleMenu(Role, payload) {
    let InsertArr = {
        roleId: Role.id,
        menuId: 5
    }
    model.role_menu.create(InsertArr);
}
module.exports = { hooks, role_menus }