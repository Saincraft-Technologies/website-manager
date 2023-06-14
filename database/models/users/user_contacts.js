const { sequelize, DataTypes, Model } = require("../../mysql");
const contacts = require("../systems/contacts");
const users = require("../systems/users");
class user_contacts extends Model { };
user_contacts = sequelize.define('user_contacts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    isAuth: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { paranoid: true });

users.belongsToMany(contacts, { through: user_contacts });
contacts.belongsToMany(users, { through: user_contacts });
users.hasMany(user_contacts);
contacts.hasMany(user_contacts);
user_contacts.belongsTo(users);
user_contacts.belongsTo(contacts);
const hooks = {
    afterCreate: (contact, payload) => {
        AddUserContact(contact, payload);
    }
}

function AddUserContact(contact, payload) {
    let InsertArr = {
        contactId: contact.id,
        userId: payload.id
    }
    model.user_contact.create(InsertArr);
}
module.exports = { hooks, user_contacts }