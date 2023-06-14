// const { passwordHash } = require("../../../backend/controllers/services/service");
const { sequelize, DataTypes, Model } = require("../../mysql");
const contacts = require('../systems/contacts');
const authentications = require('../systems/authentications');
class contact_authentications extends Model { };
contact_authentications = sequelize.define('contact_authentications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
}, { paranoid: true });



contacts.belongsToMany(authentications, { through: contact_authentications });
authentications.belongsToMany(contacts, { through: contact_authentications });
contact_authentications.belongsTo(contacts);
contact_authentications.belongsTo(authentications);
contacts.hasMany(contact_authentications);
authentications.hasMany(contact_authentications)
const hooks = {
    // beforeCreate: async (authentication, payload) => {
    //     let _hash = await passwordHash(authentication.password);
    //     authentication.hash = _hash.hashHex;
    //     authentication.salt = _hash.salt;
    //     authentication.iterations = _hash.iterations;
    //     let iv = crypto.randomBytes(16);
    //     authentication.authentication_key = crypto.randomBytes(32);
    //     let cypher = crypto.createCipheriv('aes-256-cbc', Buffer.from(authentication.authentication_key), iv);
    //     let encrypted = cypher.update(authentication.password);
    //     encrypted = Buffer.concat([encrypted, cypher.final()]);
    //     authentication.remember_token = iv.toString('hex');
    //     authentication.password = encrypted.toString('hex');
    // },
    // afterCreate: (authentication, payload) => {
    //     AddUserAuthentication(authentication, payload);
    // }
}

// function AddUserAuthentication(authentication, user) {
//     let InsertArr = {
//         userId: user.id,
//         authenticationId: authentication.id
//     }
//     model.user_authentication.create(InsertArr);
// }

// contact_authentications.prototype.encrypt = (password) => {
//     let iv = crypto.randomBytes(16);
//     let key = crypto.randomBytes(32);
//     let cypher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//     let encrypted = cypher.update(password);
//     encrypted = Buffer.concat([encrypted, cypher.final()]);
//     return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'), key: key.toString('hex') };
// };
// contact_authentications.prototype.decrypt = () => {
//     let iv = Buffer.from(this.authentication.remember_token, 'hex');
//     let encryptedText = Buffer.from(this.authentication.password, 'hex');
//     let decypher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.authentication.authentication_key), iv);
//     let dencrypted = decypher.update(encryptedText);
//     dencrypted = Buffer.concat([dencrypted, decypher.final()]);
//     return dencrypted.toString('hex');
// };
module.exports = { hooks, contact_authentications };