const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
class bookings extends Model { };
bookings = sequelize.define('bookings', {
    booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    attraction: { type: DataTypes.STRING },
    descriptions: { type: DataTypes.TEXT },
}, { paranoid: true });
bookings.belongsTo(websites);
websites.hasMany(bookings);
module.exports = bookings;