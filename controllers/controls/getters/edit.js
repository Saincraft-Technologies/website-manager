const models = require('../../../database/models/module_exporter');
const Controllers = require('../control');
const { isEmpty, singularize } = require('../service');
module.exports = async (req, res, next) => {
    const control = new Controllers(req);
    let params = [{ layout: false }];
    if (isEmpty(req.query)) {
        if (req.params.model.includes('_')) {
            let normal = await create_builder(req);
            for (const norm of normal) {
                console.log('norm =====>>>>>', norm.model);
                params[0][norm] = await(await control.find(`${norm}`, {}));
                console.log('norm =====>>>>>', ...params);
            }
            params[0][singularize(req.params.model)] = await(await control.single(`${req.params.model}`, { where: { id: req.params.id } }))
            params[0]['action'] = `/backend/${req.params.role}/${req.params.model}/edit/` + req.params.id;
            console.log(...params);
            res.render(`${req.params.role}/${req.params.model}/create`, ...params);
        } else {
            switch (req.params.model) {
                case 'menus':
                    params[0]['parents'] = await control.find('menus', { where: { parent: 0 } });
                    console.log('my menu parents ===>>>>', params);
                    break;
                case 'contents':
                    params[0]['pages'] = await control.find('pages', {});
                    break;

                case 'members':
                    /** teams where website id  ====> */
                    params[0]['teams'] = await control.find('teams', {});
                    break;

                case 'bills':
                    /** teams where website id  ====> */
                    params[0]['usages'] = await control.find('usages', {});
                    params[0]['charges'] = await control.find('charges', {});
                    params[0]['websites'] = await control.find('websites', {});
                    break;

                default:
                    break;
            }
            params[0]['action'] = `/backend/${req.params.role}/${req.params.model}/edit/` + req.params.id;
            params[0][singularize(req.params.model)] = await control.single(req.params.model, { where: { id: req.params.id } })
            console.log(...params);
            res.render(`${req.params.role}/${req.params.model}/create`, ...params);
        }

    } else {
        params[0]['action'] = `/backend/${req.params.role}/${req.params.model}/edit/` + req.params.id;
        res.render(`${req.params.role}/${req.params.model}/create/`, { layout: false });
    }
}