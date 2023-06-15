const { Sequelize } = require("sequelize");
const { pluralize } = require("../controllers/controls/service");

module.exports = {
    menus: async (models) => {
        console.log('mbona niko hapa!');
        let main = JSON.parse(JSON.stringify(await models.roles.findAll({ include: { model: models.menus } })));
        let roles = JSON.parse(JSON.stringify(await models.roles.findAll()));
        let sub_menu = [];
        let menu_main = [];
        for (const role of main) {
            if (role.role == 'superadmin') {
                for (const menu of role.menus) {
                    if (menu.parent != 0) {
                        sub_menu.push(menu);
                    } else {
                        menu_main.push(menu);
                    }
                }
            }
        }
        return { sub_menu, menu_main, roles };
    },
    normal_query: async (req, models) => {
        const db_query_includes = [];
        const extra_headers = [];
        const model = req.params.model;
        switch (model.includes('_')) {
            case true:
                /** model include underscore _ */
                let _models = model.split('_');
                let modelA = pluralize(_models[0]);
                let modelB = _models[1];
                db_query_includes.push({ model: models[modelA] });
                db_query_includes.push({ model: models[modelB] });
                extra_headers.push(modelA);
                extra_headers.push(modelB);
                break;

            default:
                console.log('model dont include _');
                let modQs = JSON.parse(JSON.stringify(await models[model].findAll()));
                console.log('mod qs key ===>', modQs[0])
                for (const key in modQs[0]) {
                    if (key.includes('Id')) {
                        console.log('mod qs key ===>', pluralize(key.split('Id')[0]))
                        db_query_includes.push({ model: models[pluralize(key.split('Id')[0])] });
                    }
                }
                console.log('mode qs db query ++++====>>>', db_query_includes)
                break;
        }

        return [db_query_includes, extra_headers];
    },
    relation_query: async (req, models) => {
        console.log('am here emu niambie ====>>>', req.params.model);
        const db_query_includes = [];
        const extra_headers = [];
        const extra_includes = [];
        const querys = req.query;
        switch (req.params.model) {
            case 'menus':
                db_query_includes.push({ model: models['roles'] });
                JSON.parse(JSON.stringify(await models['roles'].findAll())).map((role) => {
                    extra_includes.push(role);
                    extra_headers.push(role.role);
                });

                break;

            default:
                break;
        }
        for (const query in querys) {
            console.log('....embu na huyu ======>>>..', query)
            switch (query.includes('_')) {
                case true:
                    /** model include underscore _ */
                    let _models = query.split('_');
                    let modelA = pluralize(_models[0]);
                    let modelB = _models[1];
                    db_query_includes.push({ model: models[modelA] });
                    db_query_includes.push({ model: models[modelB] });
                    extra_headers.push(modelA);
                    extra_headers.push(modelB);
                    break;

                default:

                    /** model dont include underscore _ */
                    let modelQ = query;
                    db_query_includes.push({ model: models[modelQ] });
                    extra_headers.push(modelQ);
                    break;
            }
        }

        return [db_query_includes, extra_headers, extra_includes];
    },
    create_builder: async (req) => {
        const models = [];
        console.log('helper parameters ===>>>>>', await req.params);
        if (req.params.model.includes('_')) {
            let builders = req.params.model.split('_');
            for (let i = 0; i < builders.length; i++) {
                if (i <= 0) {
                    models.push(pluralize(builders[i]));
                } else {

                    models.push(builders[i]);
                }
            }
        }
        return models;
    }

}