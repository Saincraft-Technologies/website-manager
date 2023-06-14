const { Model, Sequelize, sequelize } = require("../../mysql");
class menus extends Model { };
menus = sequelize.define('menus', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    display_name: Sequelize.STRING,
    route_name: Sequelize.STRING,
    parent: Sequelize.INTEGER,
    icon: Sequelize.STRING,
    sort_order: {
        type: Sequelize.INTEGER
    },
    is_addon: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: 'if the value is 1 that means its addon'
    },
    unique_identifier: {
        type: Sequelize.INTEGER,
        comment: 'its mandatory for addon'
    }
});
module.exports = menus;