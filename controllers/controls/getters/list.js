const models = require('../../../database/models/module_exporter');
const { relation_query, normal_query } = require('../../helpers/helpers');
const Controllers = require('../control');
const { isEmpty, singularize } = require('../service');
module.exports = async (req, res, next) => {
    try {
        const control = new Controllers(req);
        console.log(req.params.model)
        /** other queries */
        let listHeaders = [];
        let entry = null;
        let update = null;
        let deleted = null;
        let list;
        let params = req.query;
        var param = [{ layout: false, route: `${req.session.passport.user.role.role}/${req.params.model}`, model: singularize(req.params.model) }];
        param[0]['layout'] = false;
        (req.params.model) ?
            list = await control.find(req.params.model, {}) : list = [];

        list.map((item, i) => {
            if (i == 0) {
                for (const header in item) {
                    if (header != 'deletedAt' && header != 'createdAt' && header != 'id') {
                        if (!header.endsWith('Id')) {
                            if (header.endsWith('At')) {
                                (header == 'updatedAt') ? update = { head: 'updated date' } : null;
                                (header == 'createdAt') ? entry = { head: 'entry date' } : null;
                                (header == 'deletedAt') ? deleted = { head: 'deleted date' } : null;

                            } else {
                                listHeaders.push({ head: (header.includes('_')) ? header.replace('_', ' ') : header });
                            }
                        } else {
                            listHeaders.push({ head: header.split('Id')[0] });
                        }
                    }
                }
            }
        });
        (entry) ?
            listHeaders.push(entry) : null;
        (update) ?
            listHeaders.push(update) : null;
        (deleted) ?
            listHeaders.push(deleted) : null;

        switch (req.params.model) {
            case 'menus':
                var normal = await relation_query(req, models);
                break;
            case 'users':
                var normal = await relation_query(req, models);
                break;
            default:
                var normal = await normal_query(req, models);
                break;
        }
        console.log('AM +++++=====>>>>', normal)
        if (isEmpty(req.query)) {
            /** works! */
            let list = await control.find(req.params.model, { include: await normal[0] });
            param[0]['headers'] = listHeaders;
            param[0][req.params.model] = list;
            for (const head of normal[1]) {
                console.log(head);
                listHeaders.push({ head: head });
            }

            param[0]['headers'] = listHeaders;

            switch (req.params.model) {
                case 'menus':
                    param[0]['roles'] = await normal[2];
                    break;
                default:
                    break;
            }
            console.log(...param);
            res.render(`${req.session.passport.user.role.role}/${req.params.model}/list`, ...param);
        } else {
            /** works without related models */
            let list = await control.find(req.params.model, {});
            param[0]['headers'] = listHeaders;
            param[0][req.params.model] = await list;
            try {

                var roles = await control.find('roles');
                param[0]['roles'] = await roles;
                for (const pr in params) {
                    console.log('prrrr=======>>>>>', param);
                    param[0][params[pr]] = await control.find(params[pr]);
                }
            } catch (error) {
                switch (req.params.model) {
                    case 'menus':
                        var roles = await control.find('roles');
                        param[0]['roles'] = await roles;
                        res.render(`${req.session.passport.user.role.role}/${req.params.model}/list`, ...param);
                        break;

                    default:
                        var roles = await control.find('roles');
                        param.push({ 'roles': await roles });
                        res.render(`${req.session.passport.user.role.role}/${req.params.model}/list`, ...param);
                        console.log(error.message);
                        break;
                };
            }
            console.log(...param);
        }
    } catch (err) {
        console.log(err.message);
        res.render(`${req.session.passport.user.role.role}/${req.params.model}/list`, ...param);
    }
}

