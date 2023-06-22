const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const attractions = require("./attractions");
const points = require("./points");
class itineraries extends Model { };
/** relative table for point provision! */
itineraries = sequelize.define('itineraries', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    attenary: { type: DataTypes.STRING },
    days: { type: DataTypes.STRING({ length: 8 }) },
    cost: { type: DataTypes.DOUBLE({ length: '8,2' }) },
    adults:{type:DataTypes.INTEGER},
    children:{type:DataTypes.INTEGER},
    description: { type: DataTypes.TEXT },
    terms_conditions: { type: DataTypes.TEXT },
    health_conditions: { type: DataTypes.TEXT },
    tips: { type: DataTypes.TEXT },
    other: { type: DataTypes.TEXT },
}, { paranoid: true });

attractions.belongsToMany(points, { through: itineraries });
points.belongsToMany(attractions, { through: itineraries });
attractions.hasMany(itineraries);
points.hasMany(itineraries);
itineraries.belongsTo(attractions);
itineraries.belongsTo(points);
module.exports = itineraries;