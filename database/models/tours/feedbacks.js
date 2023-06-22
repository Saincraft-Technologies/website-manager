const { Model, DataTypes, sequelize } = require("../../mysql");
const websites = require("../systems/websites");
class feedbacks extends Model { };
/** comment from website visitors! */
feedbacks = sequelize.define('feedbacks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    comment: { type: DataTypes.TEXT },
    username: { type: DataTypes.STRING },
    subscribe: { type: DataTypes.BOOLEAN }
}, { paranoid: true });
feedbacks.belongsTo(websites);
websites.hasMany(feedbacks);
module.exports = feedbacks;