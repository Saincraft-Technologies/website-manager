const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
const attenaries = require("./itineraries");
const attractions = require("./attractions");
class galleries extends Model { };
/** Galleries where different images will be found! */
galleries = sequelize.define('galleries', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    gallery: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
}, { paranoid: true });
galleries.belongsTo(websites);
websites.hasMany(galleries);
module.exports = galleries;