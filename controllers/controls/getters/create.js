const { create_builder } = require('../../helpers/helpers');
const Controllers = require('../control');
const { isEmpty } = require('../service');
module.exports = async (req, res, next) => {
    const control = new Controllers(req);
    let params = [{ layout: false }];
    if (isEmpty(req.query)) {
        if (req.params.model.includes('_')) {
            let normal = await create_builder(req);
            for (const norm of normal) {
                console.log('norm =====>>>>>', norm.model);
                params[0][norm] = await (await control.find(`${norm}`, {}));
                console.log('norm =====>>>>>', ...params);
            }
            params[0]['action'] = `/backend/${req.params.role}/${req.params.model}/create`;
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
                    console.log('my menu parents ===>>>>', params);
                    break;
                case 'members':
                    params[0]['teams'] = await control.find('teams', {});
                    console.log('my team parents ===>>>>', params);
                    break;
                case 'usages':
                    params[0]['websites'] = await control.find('websites', {});
                    console.log('my team parents ===>>>>', params);
                    break;
                case 'accounts':
                    params[0]['methods'] = await control.find('methods', {});
                    console.log('my team parents ===>>>>', params);
                    break;
                case 'bills':
                    params[0]['websites'] = await control.find('websites', {});
                    params[0]['charges'] = await control.find('charges', {});
                    params[0]['usages'] = await control.find('usages', {});
                    console.log('my team parents ===>>>>', params);
                    break;
                case 'payments':
                    params[0]['accounts'] = await control.find('accounts', {});
                    params[0]['websites'] = await control.find('websites', {});
                    console.log('my team parents ===>>>>', params);
                    break;
                case 'attractions':
                    params[0]['websites'] = await control.find('websites', {});
                    console.log('my team parents ===>>>>', params);
                    break;
                case 'feedbacks':
                    params[0]['websites'] = await control.find('websites', {});
                    console.log('my team parents ===>>>>', params);
                    break;
                default:
                    break;
            }
            params[0]['action'] = `/backend/${req.params.role}/${req.params.model}/create`;
            console.log(...params);
            res.render(`${req.params.role}/${req.params.model}/create`, ...params);
        }

    } else {
        params[0]['action'] = `/backend/${req.params.role}/${req.params.model}/create`;
        res.render(`${req.params.role}/${req.params.model}/create`, { layout: false });
    }
}
