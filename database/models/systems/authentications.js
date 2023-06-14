const { Model, DataTypes, sequelize } = require("../../mysql");
class authentications extends Model { };
authentications = sequelize.define('authentications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iterations: DataTypes.INTEGER,
    remember_token: DataTypes.STRING,
    authentication_key: DataTypes.STRING,
}, { paranoid: true });
module.exports = authentications;
