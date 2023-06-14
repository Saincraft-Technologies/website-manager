
const Utility = require('./menu_mysql');

const { passwordHash } = require('../backend/controllers/services/service');

class UtilQuery {
    constructor() {
    }
    async syncForceTable() {
        try {
            return await Utility.sequelize.sync({ force: true });

        } catch (err) {
            console.log(err);
            return err;
        }
    }
    async syncTable() {
        try {
            let sql = (await Utility.sequelize).sync();
            return await sql;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = UtilQuery;