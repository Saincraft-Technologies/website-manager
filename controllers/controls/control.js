
const models = require('../../database/models/module_exporter');
// const RelationPostingEvents = require('../RelationEventHandler');
const Session = require('./session');

/**
 * @class {Controllers} Controller used to extend session
 * used as a middleware between request and db query
 * Future use is to try to use it to carry out validation
 */

class Controllers extends Session {
    constructor(req) {
        super(req);
    }
    async authorize() {
        if (await this.checkApp() != undefined) {
            return this.checkApp();
            // }
        } else {
            await this.authorize();
        }

    }
    async find(model, opt) {
        let t = await this.authorize();
        if (t) {
            console.log('tina', model);
            return JSON.parse(JSON.stringify(await models[model].findAll(opt)));
        } else {
            throw new Error('unauthorized!');
        }
    }
    async findCount(model, opt) {
        let t = await this.authorize();
        // console.log(await t);
        if (t) {
            return JSON.parse(JSON.stringify(await models[model].findAndCountAll(opt)));
        } else {
            throw new Error('unauthorized!');
        }
    }
    async single(model, opt) {
        let t = await this.authorize();
        // console.log(await t);
        if (t) {
            return JSON.parse(JSON.stringify(await models[model].findOne(opt)));
        } else {
            throw new Error('unauthorized!');
        }
    }
    async create(model, data) {
        let t = await this.authorize();
        // console.log(await t);
        if (t) {
            return JSON.parse(JSON.stringify(await models[model].build(data).save()));
        } else {
            throw new Error('unauthorized!');
        }
    }
    async update(model, data, opt) {
        let t = await this.authorize();
        // console.log(await t);
        if (t) {
            return JSON.parse(JSON.stringify(await models[model].update(data, opt)));
        } else {
            throw new Error('unauthorized!');
        }
    }
    async sum(model, opt) {
        let t = await this.authorize();
        // console.log(await t);
        if (t) {
            return JSON.parse(JSON.stringify(await models[model].sum(opt)));
        } else {
            throw new Error('unauthorized!');
        }
    }
    async delete(model, opt) {
        let t = await this.authorize();
        // console.log(await t);
        if (t) {
            return JSON.parse(JSON.stringify(await models[model].destroy(opt)));
        } else {
            throw new Error('unauthorized!');
        }
    }
    async getParams(req) {
        // console.log(await this._request.url);
        if (this._request.url.includes('?')) {
            let dataArray = await [...this._request.url.split('?')[1].split('&')];
            let data = {};
            dataArray.forEach(s => {
                data[s.split('=')[0]] = s.split('=')[1];
            });

            data = JSON.parse(JSON.stringify(await data));
            return data;
        }
    }

}

module.exports = Controllers;