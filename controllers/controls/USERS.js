const { users } = require("../../../database/models/module_exporter");
const db_context = require("./context");
const { sequelize, DataTypes } = require("../../../database/mysql");
const USER = require("../stricts/models/USER")(sequelize, DataTypes);
const UPLOAD = require("../stricts/models/UPLOAD")(sequelize, DataTypes);
class user extends db_context {
    #hash
    constructor() {
        super();
        this.#hash = null;
        this.init().then().catch(err => { throw err })
        this.connect().then(seq => {
            if (seq) {
                this._user = this._db.model('User');
            }
        });
    }
    async init() {
    }
    async addGeneric(data) {
        try {
            /** connecting */
            // this.USER = await this.connect();
            /** set contact model */

            data.phone = parseInt(data.phone);
            data.email = data.email.trim();
            let contact = this._db.model('contacts').build(data);
            await contact.save();
            /**
             * add user
             */
            await this.USER.build(data);
            await this.USER.save();
            /** add user to contact */
            await contact.addUser(await this.USER);

            /** add language to user */
            let language = await this._db.model('languages').findOne({ where: { abbreviation: 'en' } });
            await this._users.addLanguage(await language);


            /** add user to signup */
            let signup = await this._db.model('signups').build(data);
            await signup.save();
            await this._users.addSignup(await signup);


        } catch (err) {
            await this.close();
            console.log('save failed!');
            return err.message;
        }
    }
    async addAuth(data) {
        try {
            await this.connect();
            this.#hash = await passwordHash(data.password);
            data.hash = this.#hash.hashHex;
            data.salt = this.#hash.salt;
            data.iterations = this.#hash.iterations;
            return await this._db.model('authentications').build(data).save();
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    async upload(data, id) {
        /** connecting */
        try {
            await this.connect();
            let upload = await this._db.model('upload').build(data);
            await upload.save()
            await this._user.update({ uploadId: await upload.id }, { where: { id: id } });
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = user;