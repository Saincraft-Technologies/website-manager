const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const points = require("./points");
const provisions = require("./provisions");
class point_galleries extends Model { };
/** relative table for point provision! */
point_galleries = sequelize.define('point_galleries', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
    }
}, { paranoid: true });
points.belongsToMany(provisions, { through: point_galleries });
provisions.belongsToMany(points, { through: point_galleries });
points.hasMany(point_galleries);
provisions.hasMany(point_galleries);
point_galleries.belongsTo(points);
point_galleries.belongsTo(provisions);
module.exports = point_galleries;