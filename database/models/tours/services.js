// const { UUIDV4 } = require("sequelize");
// const { Model, DataTypes, sequelize } = require("../../mysql");
// const points = require("./points");
// const provisions = require("./provisions");
// class services extends Model { };
// /** relative table for point provision! */
// services = sequelize.define('services', {
//     id: {
//         type: DataTypes.STRING,
//         defaultValue: UUIDV4,
//         primaryKey: true,
//     },
//     service: { type: DataTypes.STRING },/** service name may be transport */
//     cost: { type: DataTypes.DOUBLE({ length: 11 }) },
//     provider: { type: DataTypes.STRING() },
//     description: { type: DataTypes.TEXT },
// }, { paranoid: true });
// module.exports = services;