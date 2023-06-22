const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const attractions = require("./attractions");
const galleries = require("./galleries");
class attraction_galleries extends Model { };
/** relative table for attraction galleries! */
attraction_galleries = sequelize.define('attraction_galleries', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
    }
}, { paranoid: true });
attractions.belongsToMany(galleries, { through: attraction_galleries });
galleries.belongsToMany(attractions, { through: attraction_galleries });
attractions.hasMany(attraction_galleries);
galleries.hasMany(attraction_galleries);
attraction_galleries.belongsTo(attractions);
attraction_galleries.belongsTo(galleries);
module.exports = attraction_galleries;