
const Controllers = require('../control');
const { capitalize, pluralize, singularize, isEmpty } = require('../service');
/** Saincraft-Api version II 
 *  This code is resposible with querying from db two level of relations from each join 
 *  This code is compatitle with sequelize "^6.29.0" nodels inputs
 *  Models have to be served as an object array where they can be served by their name as index models[name]; 
 *  Then let continue version 2.0
*/
const modelPath = '../database/models/module_exporter';
class Poster {
    #_req;
    #_control;
    #models;
    #associates;
    #associations;
    #_data;
    constructor(req) {
        this.#_control = new Controllers(req);
        this.#models = require(modelPath);
        this.#_req = req;
        this.#_data = this.#_req.body;
        this.#associations = this.#models[this.#_req.params.model].associations;
        this.#associates = [];
        this.response = {
            status: false,
            notification: 'failed! Powered by saincraft!',
            data: null,
            url: '',
            error: new Error(null),
            model: null
        };
    }
    async post_v2() {

        try {
            console.log(this.#associates);
            switch (this.#_req.method) {
                case 'POST':
                    switch (isEmpty(this.#_req.query)) {
                        case false:
                            let queries = this.#_req.query;
                            /** stored created queries! */
                            let createArray = [];
                            /** stored find queries! */
                            let findArray = [];
                            try {
                                /** creating model */
                                for (const query in queries) {
                                    /** for each query */
                                    if (typeof queries[query] === typeof []) {
                                        /** if query includes comma , */
                                        /** @tutorial 
                                         * [Splits the comma and loop through!] 
                                         *  
                                         * The first item should be creators !
                                         * 
                                         * The rest become finders!
                                         * 
                                         * Null can be passed at the creators to escape creating
                                         **/
                                        let queryQuery = queries[query];
                                        queryQuery.map(async (qry, i) => {
                                            if (i <= 0) {
                                                if (!qry == null) {
                                                    createArray.push(await this.#_control.create(qry, this.#_data));
                                                }
                                            } else {
                                                if (!this.#_data[singularize(qry) + 'Id'] == undefined) {
                                                    findArray.push(await this.#_control.single(qry, { where: { id: this.#_data[singularize(qry) + 'Id'] } }));
                                                }
                                            }
                                        })
                                        console.log('query ===>> inside ', createArray, findArray);
                                    } else {
                                        /** query is not array */

                                        console.log('query ===>> ', queries[query]);
                                        if (!this.#_data[singularize(queries[query]) + 'Id'] == undefined) {
                                            findArray.push(await this.#_control.single(queries[query], { where: { id: this.#_data[singularize(queries[query]) + 'Id'] } }));
                                        } else {
                                            /** if id is not present in the body i should just leave it error return  */
                                            new Error(singularize(queries[query]) + 'Id is not provided the process has been escaped!')
                                        }
                                    }
                                }
                                console.log('finders ===>>', findArray);
                                console.log('creators ===>>', createArray);
                                /** loop through create array and finder arrays then add to categories */
                                /** query is not empty */
                                this.response.status = true;
                                this.response.notification = 'successfully added ' + singularize(this.#_req.params.model);
                                this.response.url = this.#_req.url;
                                this.response.model = await this.#models[this.#_req.params.model];
                                return this.response;
                            } catch (err) {
                                console.log(err);
                                this.response.status = false;
                                this.response.notification = 'failed to add ' + singularize(this.#_req.params.model);
                                this.response.error = err.original.sqlMessage;
                                return this.response;
                            }
                            break;
                        default:
                            /** query is not empty */

                            break;
                    }
                    switch (this.#_req.query.rel0 != undefined && this.#_req.query.rel0 != '') {
                        case false:
                            this.response.status = true;
                            this.response.notification = 'successfully added ' + singularize(this.#_req.params.model);
                            this.response.url = this.#_req.url;
                            this.response.model = await this.#models[this.#_req.params.model];
                            try {
                                this.response.data = await this.#_control.create(this.#_req.params.model, this.#_data);
                                return this.response;
                            } catch (err) {
                                this.response.status = false;
                                this.response.notification = 'failed to add ' + singularize(this.#_req.params.model);
                                this.response.error = err.original.sqlMessage;
                                return this.response;
                            }
                            break;
                        default:
                            /** relations have been defined! */
                            let qryRels = this.#_req.query.rel;
                            switch (qryRels.includes(',')) {
                                case false:
                                    switch (qryRels.includes(' ')) {
                                        case false:
                                            /** qryRels group has no space in it */
                                            // if (await this.#models[qryRels].build(this.#_req.body)._changed.size > 0) {
                                            // this.#associations[qryRels] = await this.#models[qryRels].build(this.#_req.body);
                                            if (qryRels.includes('_')) {
                                                // constructing foreignkey
                                                var foreignKeys = qryRels.split('_');
                                                console.log('dt2====>', foreignKeys);
                                                // if (foreignKeys.length <= 0) {

                                                var foreignKey = foreignKeys[0] + capitalize(singularize(foreignKeys[1])) + 'Id';
                                                console.log('its false dat!', foreignKey);
                                                /** check the request data if it has the foreign key */
                                                for (const bodyData in this.#_data) {
                                                    console.log(bodyData);
                                                    switch (bodyData.includes(foreigkey)) {
                                                        case false:
                                                            console.log('its false!1');
                                                            break;
                                                        default:
                                                            console.log('its true dat2!', foreigkey);
                                                            console.log('its true!');
                                                            break;
                                                    }
                                                }
                                                // }
                                            } else {
                                                var foreigkey = singularize(qryRels) + 'Id';
                                                console.log(foreigkey);
                                                for (const bodyData in this.#_data) {
                                                    switch (bodyData == foreigkey) {
                                                        case false:
                                                            console.log('its false2!');
                                                            break;
                                                        default:
                                                            console.log('its true dat2!', foreigkey);
                                                            console.log('its true!');
                                                            break;
                                                    }
                                                }
                                            }
                                            break;
                                            // }
                                            console.log('no data');
                                            this.response.notification = 'there is no post data!';
                                            break;
                                        default:
                                            /** qryMain group has space in it */
                                            var qrySub = qryMain.split(' ');
                                            qrySub.map(async (sub, x) => {
                                                if (x <= 0) {
                                                    if (await this.#models[sub].build(this.#_req.body)._changed.size > 0) {
                                                        this.#associations[sub] = await models[sub].build(req.body);
                                                    }
                                                } else {
                                                    if (await this.#models[sub].build(this.#_req.body)._changed.size > 0) {
                                                        this.#associations[sub] = await models[sub].build(req.body);
                                                    }
                                                }
                                            });
                                            break;
                                    }
                                    break;

                                default:
                                    /** relations include commas , */
                                    console.log('commas');
                                    let relMainArray = qryRels.split(',');
                                    relMainArray.map(async (qryMain, i) => {
                                        switch (qryMain.includes(' ')) {
                                            case false:
                                                /** qryMain group has space in it */
                                                var qrySub = qryMain.split(' ');
                                                qrySub.map(async (sub, x) => {
                                                    if (x <= 0) {
                                                        if (await this.#models[sub].build(this.#_req.body)._changed.size > 0) {
                                                            this.#associations[sub] = await models[sub].build(req.body);
                                                        }
                                                    } else {
                                                        if (await this.#models[sub].build(this.#_req.body)._changed.size > 0) {
                                                            this.#associations[sub] = await models[sub].build(req.body);
                                                        }
                                                    }
                                                });
                                                break;

                                            default:
                                                /** qryMain group has space in it */
                                                var qrySub = qryMain.split(' ');
                                                qrySub.map(async (sub, x) => {
                                                    if (x <= 0) {
                                                        if (await this.#models[sub].build(this.#_req.body)._changed.size > 0) {
                                                            this.#associations[sub] = await models[sub].build(req.body);
                                                        }
                                                    } else {
                                                        if (await this.#models[sub].build(this.#_req.body)._changed.size > 0) {
                                                            this.#associations[sub] = await models[sub].build(req.body);
                                                        }
                                                    }
                                                });
                                                break;
                                        }
                                    });
                                    break;
                            }
                            /** finally saving with all associates */
                            for (const assoc in this.#associations) {
                                /** save all asscociations here one by one the best way is to use associates with joined tables */
                                if (this.#associations[assoc]._changed) {
                                    /** the associate value is changed from initial state */
                                    for (const dt in this.#_req) {
                                        /** trying to parse the relations. seems i have to store them somewhere, 
                                         * i also have to determing if the id of the relations is defined like chargeCategoryId from charge_categories request query 
                                         * this functionality should be defined when am pushing the request query  */
                                        switch (dt.includes(singularize(assoc) + 'Id')) {
                                            case false:
                                                let dt2 = dt.split('_');
                                                console.log('dt2====>', dt2)
                                                dt2 = dt2[0] + capitalize(singularize(dt2[1]));
                                                console.log('its false dat!', dt2);
                                                switch (includes(singularize(dt2) + 'Id')) {
                                                    case false:
                                                        console.log('its false!');
                                                        break;

                                                    default:
                                                        console.log('its true dat2!', dt2);
                                                        console.log('its true!');
                                                        break;
                                                }
                                                break;

                                            default:
                                                console.log('its true!');
                                                break;
                                        }
                                    }
                                    // this.#_control.create(assoc, this.#_data);
                                }
                                // var mmodel = this.#models[this.#_req.params.model].build(this.#_req.body).save();
                                // await mmodel.add[capitalize(assoc)]([await this.#associates[assoc].save()]);
                                console.log('associations', this.#associations[assoc]);
                            }
                            break;
                    }
                    break;
                default:
                    this.response.status = false;
                    this.response.notification = 'method not allowed!';
                    this.response.url = this.#_req.url;
                    this.response.data = null;

                    return this.response;
                    break;
            }
            // console.log(this.#associates);

            // let main = await this.#_control.create(this.#_req.params.model, this.#_req.body);

            // this.response.data = await (this._control.create(this.#_req.params.model, this.#_req.body));
            // this.response.status = true;
            // this.response.notification = 'successfully added ', this.#_req.params.model;
            // return this.response;
        } catch (err) {
            console.log(err);
            this.response.status = false;
            this.response.notification = err.message;
            this.response.url = this.#_req.url;
            this.response.data = null;

            return this.response;
        }
    }
    async post() {
        try {
            this.response.data = await (this._control.create(this.#_req.params.model, this.#_req.body));
            this.response.status = true;
            this.response.notification = 'successfully added ', this.#_req.params.model;
            return this.response;
        } catch (err) {
            console.log(err);
            this.response.status = false;
            this.response.notification = err.message;
            this.response.url = this.#_req.url;
            this.response.data = null;

            return this.response;
        }
    }
    delete() {

    }
}
module.exports = Poster;