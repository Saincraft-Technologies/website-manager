const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
class newsletters extends Model { };
newsletters = sequelize.define('newsletters', {
    newsletter_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    from: { type: DataTypes.STRING },
    head: { type: DataTypes.STRING },
    body: { type: DataTypes.TEXT },
    signature: { type: DataTypes.STRING },
}, { paranoid: true });
newsletters.belongsTo(websites);
websites.hasMany(newsletters);
module.exports = newsletters;