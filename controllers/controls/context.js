const events = require('events');
const { sequelize } = require('../../../database/models/system_properties/uploads');
const { Sequelize } = require('sequelize');
class db_context extends events {
    constructor() {
        super();
        /** connecting to sequalize instance */
        this.addListener('connect', async () => {

            try {
                this._db = await sequelize;
                console.log('connection established!...')
            } catch (err) {
                this.emit('error', err);
            }
        });
        this.addListener('close', async () => {
            try {
                await this._db.close();
                console.log('connection closed!...')
            } catch (err) {
                this.emit('error', err);
            }
        });

        this.addListener('error', async (error) => {
            console.log('connection error!...', error.message)
            return await error.message;
        });
    }
    async connect() {
        console.log('database connected!');
        await this.emit('connect');
        return true;
    }
    async close() {
        if (this._db) {
            await this.emit('close');
        }
    }
}

module.exports = db_context;
