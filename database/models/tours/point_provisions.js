const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const points = require("./points");
const provisions = require("./provisions");
class point_provisions extends Model { };
/** relative table for point provision! */
point_provisions = sequelize.define('point_provisions', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    duration: { type: DataTypes.STRING },
    opening: { type: DataTypes.STRING({ length: 8 }) },
    closing: { type: DataTypes.STRING({ length: 8 }) },
    description: { type: DataTypes.TEXT },
}, { paranoid: true });
points.belongsToMany(provisions, { through: point_provisions });
provisions.belongsToMany(points, { through: point_provisions });
points.hasMany(point_provisions);
provisions.hasMany(point_provisions);
point_provisions.belongsTo(points);
point_provisions.belongsTo(provisions);
module.exports = point_provisions;