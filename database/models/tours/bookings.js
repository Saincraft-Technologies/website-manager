const { UUIDV1 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
class bookings extends Model { };
/** Bookings done by website visitors */
bookings = sequelize.define('bookings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ref_id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV1
    },
    adults: { type: DataTypes.INTEGER },
    children: { type: DataTypes.INTEGER },
    disabled_adults: { type: DataTypes.INTEGER },
    disabled_children: { type: DataTypes.INTEGER },
    country: { type: DataTypes.STRING },
    region: { type: DataTypes.STRING },
    special_request: { type: DataTypes.TEXT }
}, { paranoid: true });
bookings.belongsTo(websites);
websites.hasMany(bookings);
module.exports = bookings;