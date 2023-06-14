const { sequelize, DataTypes, Model } = require("../../mysql");
const users = require('../systems/users');
const addresses = require('../systems/addresses');
class user_addresses extends Model { };
user_addresses = sequelize.define('user_addresses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
}, { paranoid: true });

users.belongsToMany(addresses, { through: user_addresses });
addresses.belongsToMany(users, { through: user_addresses });
const hooks = {
    afterCreate: (address, payload) => {
        AddUserAddress(address, payload);
    }
}

function AddUserAddress(address, payload) {
    let InsertArr = {
        addressId: address.id,
        userId: payload.id
    }
    model.user_address.create(InsertArr);
}
module.exports = { hooks, user_addresses }