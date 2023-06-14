
const { Sequelize, sequelize } = require('./mysql');
const customeTable = require('./tables');

// const { passwordHash } = require('../backend/controllers/services/service');

class Query {
    constructor() {
    }
    async syncForceTable() {
        try {
            return await sequelize.sync({ force: true });

        } catch (err) {
            console.log(err);
            return err;
        }
    }
    async syncTable() {
        try {
            let sql = (await sequelize).sync();
            return await sql;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = Query;