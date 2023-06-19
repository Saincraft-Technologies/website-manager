// const { sequelize, DataTypes, Model } = require("../../mysql");
// const sessions = require("../systems/sessions");
// const users = require("../systems/users");
// class user_sessions extends Model { };
// user_sessions = sequelize.define('user_sessions', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         unique: true
//     },
//     active: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     }
// }, { paranoid: true });

// users.belongsToMany(sessions, { through: user_sessions });
// sessions.belongsToMany(users, { through: user_sessions });
// users.hasMany(user_sessions);
// sessions.hasMany(user_sessions);
// user_sessions.belongsTo(users);
// user_sessions.belongsTo(sessions);

// module.exports = user_sessions;