const Controllers = require('../controllers/controls/control');
const { getter } = require('./relationParser');
/** Saincraft-Api version II 
 *  This code is resposible with querying from db two level of relations from each join 
 *  This code is compatitle with sequelize "^6.29.0" nodels inputs
 *  Models have to be served as an object array where they can be served by their name as index this.models[name]; 
 *  Then let continue version 2.0
*/
const modelPath = '../database/models/module_exporter';
class Getter {
    #_req;
    #_control;
    #models;
    constructor(req) {
        this.#_control = new Controllers(req);
        this.#models = require(modelPath);
        this.#_req = req;
        this.response = {
            status: false,
            notification: 'failed! saincraftapi_v2.0',
            count: 0,
            limit: 20,
            offset: 0,
            data: null,
            url: '',
            error: new Error(null)
        };
    }
    /** @bySaincraftTechnologies lab 
     * 
     * @returns 
     *  @example
     *  RETURN JSON() {
     * status :BOOLEAN, 
     * notification :STRING,
     * count :INTEGER,
     * limit :INTEGER,
     * offset :INTEGER,
     * url :STRING,
     * data :JSON || JSON[]
     * }
     */
    async get_v2() {
        try {
            console.log("all rel===>>", this.#_req.query);
            switch (this.#_req.query.rel0 != undefined && this.#_req.query.rel0 != '') {
                case true:

                    const relations = await getter(this.#_req.query, this.#models);

                    this.response.data = await (this.#_control.findCount(this.#_req.params.model, { include: relations }));
                    // console.log('response1', this.response.data);
                    this.response.count = this.response.data.count;
                    this.response.data = this.response.data.rows;
                    this.response.url = this.#_req.baseUrl + this.#_req.url;
                    this.response.notification = 'success fetching ' + this.#_req.params.model;
                    this.response.status = true;
                    return await this.response;
                // console.log('relations', relations);

                default:

                    this.response.data = await (this.#_control.findCount(this.#_req.params.model, {}));
                    // console.log('response1', this.response.data);
                    this.response.count = this.response.data.count;
                    this.response.data = this.response.data.rows;
                    this.response.url = this.#_req.baseUrl + this.#_req.url;
                    this.response.notification = 'success fetching ' + this.#_req.params.model;
                    this.response.status = true;
                    return await this.response;
                    break;
            }

        } catch (err) {
            console.log(err);
            return { status: false, notification: err.message, url: this.#_req.baseUrl + this.#_req.url, data: null };
        }
    }
    /***************************************** END OF GET ALL ************************************************/
    /** get by ID */
    async getId_v2() {
        let id = this.#_req.params.id;
        try {
            switch (this.#_req.query.rel0 != undefined && this.#_req.query.rel0 != '') {
                case true:

                    const relations = await getter(this.#_req.query, this.#models);

                    this.response.data = await (this.#_control.findCount(this.#_req.params.model, { where: { id: id }, include: relations }));
                    // console.log('response1', this.response.data);
                    this.response.count = this.response.data.count;
                    this.response.data = this.response.data.rows;
                    this.response.url = this.#_req.baseUrl + this.#_req.url;
                    this.response.notification = 'success fetching ' + this.#_req.params.model;
                    this.response.status = true;
                    return await this.response;
                // console.log('relations', relations);

                default:

                    this.response.data = await (this.#_control.findCount(this.#_req.params.model, { where: { id: id } }));
                    // console.log('response1', this.response.data);
                    this.response.count = this.response.data.count;
                    this.response.data = this.response.data.rows;
                    this.response.url = this.#_req.baseUrl + this.#_req.url;
                    this.response.notification = 'success fetching ' + this.#_req.params.model;
                    this.response.status = true;
                    return await this.response;
                    break;
            }

        } catch (err) {
            console.log(err);
            return { status: false, notification: err.message, url: this.#_req.baseUrl + this.#_req.url, data: null };
        }
    }

    /***************************************** END OF GET BY ID ************************************************/
    async getEmail_v2() {
        let email = this.#_req.params.email;
        try {

            switch (this.#_req.query.rel0 != undefined && this.#_req.query.rel0 != '') {
                case true:

                    const relations = await getter(this.#_req.query, this.#models);

                    this.response.data = await (this.#_control.findCount(this.#_req.params.model, { where: { email: email }, include: relations }));
                    // console.log('response1', this.response.data);
                    this.response.count = this.response.data.count;
                    this.response.data = this.response.data.rows;
                    this.response.url = this.#_req.baseUrl + this.#_req.url;
                    this.response.notification = 'success fetching ' + this.#_req.params.model;
                    this.response.status = true;
                    return await this.response;
                // console.log('relations', relations);

                default:

                    this.response.data = await (this.#_control.findCount(this.#_req.params.model, { where: { email: email } }));
                    // console.log('response1', this.response.data);
                    this.response.count = this.response.data.count;
                    this.response.data = this.response.data.rows;
                    this.response.url = this.#_req.baseUrl + this.#_req.url;
                    this.response.notification = 'success fetching ' + this.#_req.params.model;
                    this.response.status = true;
                    return await this.response;
                    break;
            }

        } catch (err) {
            console.log(err);
            return { status: false, notification: err.message, url: this.#_req.baseUrl + this.#_req.url, data: null };
        }
    }
    post() {


    }
    delete() {

    }
}
module.exports = Getter;