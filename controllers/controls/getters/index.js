const models = require('../../../database/models/module_exporter');
const Controllers = require('../control');
const { isEmpty, singularize } = require('../service');

/** model is the database model and the frontend handler for querying */
module.exports = async (req, res, next) => {
    let model = (req.params.model.includes('_')) ? singularize(req.params.model).replace('_', ' ') : singularize(req.params.model);

    console.log('model singular and plural', req.url);
    // console.log(isEmpty(req.query));
    const control = await new Controllers(req);
    let menuIcon = await control.single('menus', { where: { route_name: req.url.split(req.params.role)[1] } });
    /** pretify the model name remove underscore if present */
    let models = (req.params.model.includes('_')) ? req.params.model.replace('_', ' ') : req.params.model;
    let relationQuery = '';
    let queries = req.query;


    var listRoute = `${req.session.passport.user.role.role}/${req.params.model}/list`

    if (!isEmpty(req.query)) {
        if (req.query['rel0']) {
            let creator = `/${req.params.role}/${req.params.model}/create`;
            console.log('before running');
            res.render(`${req.params.role}/manager/index`, { layout: false, viewManager: req.session.passport.user, listRoute: listRoute, menuIcon: menuIcon.icon, model: model, _model: req.params.model, models: models, relationQuery: relationQuery, creator: creator })
        } else {
            console.log(relationQuery.split('=')[0]);
            console.log('relation queries', model);
            let creator = `/${req.params.role}/${req.params.model}/create`
            res.render(`${req.params.role}/manager/index`, { layout: false, viewManager: req.session.passport.user, listRoute: listRoute, menuIcon: menuIcon.icon, model: model, _model: req.params.model, models: models, relationQuery: relationQuery, creator: creator })
        }
    } else {
        console.log('am here');
        let creator = `/${req.params.role}/${req.params.model}/create`
        res.render(`${req.params.role}/manager/index`, { layout: false, viewManager: req.session.passport.user, listRoute: listRoute, menuIcon: menuIcon.icon, model: model, _model: req.params.model, models: models, relationQuery: relationQuery, creator: creator })
    }
}

