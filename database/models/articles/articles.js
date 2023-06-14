const { Model, DataTypes, sequelize } = require("../../mysql");
/** charge item gari, nyama,  */
class articles extends Model { };
articles = sequelize.define('articles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    descriptions: { type: DataTypes.STRING }
}, { paranoid: true });

module.exports = articles;