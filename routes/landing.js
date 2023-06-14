const express = require('express');
const router = express.Router();
const models = require('../database/models/module_exporter');
const { Op } = require('../database/mysql');
const Controllers = require('../controllers/controls/control');
const { isLoggedIn, hasToken } = require('../passport/passport');
const { user } = require('../multipart/multerConfig');
const { menus, normal_query, create_builder, relation_query } = require('./helpers');
const { singularize, pluralize, isEmpty } = require('../controllers/controls/service');
router.get('/', isLoggedIn, async (req, res) => {
    console.log("Passport ===>>>", req.session.passport);
    res.render('index', { route: `backend/${req.session.passport.user.role.role}/dashboard`, name: 'Dashboard', title: 'Dashboard', item: req.session.passport.user.role.role, viewManager: req.session.passport.user, menus: (await menus(models)).menu_main, sub_menu: (await menus(models)).sub_menu });
});

router.get('/:role/dashboard', isLoggedIn, async (req, res) => {
    console.log('am here!!!!', req.params);
    const control = new Controllers(req);
    let data = await (await control.find('applications', {}));
    // console.log("passport user", req.session.passport.user);
    res.render(`${req.params.role}/dashboard`, { layout: false, viewManager: req.session.passport.user, applications: data, menus: (await menus(models)).menu_main, sub_menu: (await menus(models)).sub_menu })
});
router.get('/:role/:model/index', isLoggedIn, async (req, res) => {
    /** model is the database model and the frontend handler for querying */
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
            res.render(`${req.params.role}/manager/index`, { layout: false, listRoute: listRoute, menuIcon: menuIcon.icon, model: model, _model: req.params.model, models: models, relationQuery: relationQuery, creator: creator })
        } else {
            console.log(relationQuery.split('=')[0]);
            console.log('relation queries', model);
            let creator = `/${req.params.role}/${req.params.model}/create`
            res.render(`${req.params.role}/manager/index`, { layout: false, listRoute: listRoute, menuIcon: menuIcon.icon, model: model, _model: req.params.model, models: models, relationQuery: relationQuery, creator: creator })
        }
    } else {
        console.log('am here');
        let creator = `/${req.params.role}/${req.params.model}/create`
        res.render(`${req.params.role}/manager/index`, { layout: false, listRoute: listRoute, menuIcon: menuIcon.icon, model: model, _model: req.params.model, models: models, relationQuery: relationQuery, creator: creator })
    }
});

router.get('/:role/:model/list', isLoggedIn, async (req, res) => {
    const control = new Controllers(req);
    console.log(req.query)
    /** other queries */
    let listHeaders = [];

    let list = await control.find(req.params.model, {});

    list.map((item, i) => {
        if (i == 0) {
            for (const header in item) {
                if (header != 'deletedAt' && header != 'createdAt' && header != 'updatedAt' && header != 'id') {
                    if (!header.endsWith('Id')) {
                        listHeaders.push({ head: (header.includes('_')) ? header.replace('_', ' ') : header });
                    }
                }
            }
        }
    });

    var param = [{ layout: false }];
    switch (req.params.model) {
        case 'menus':
            var normal = await relation_query(req, models);

            break;

        default:
            var normal = await normal_query(req, models);
            break;
    }
    console.log('AM +++++=====>>>>', normal[2])
    if (isEmpty(req.query)) {
        /** works! */
        let list = await control.find(req.params.model, { include: await normal[0] });
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
        let params = req.query;
        param[0]['layout'] = false;
        param[0]['headers'] = listHeaders;
        let list = await control.find(req.params.model, {});
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
});
router.get('/:role/:model/create', isLoggedIn, user().none(), async (req, res) => {
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
            params[0]['action'] = `/backend/${req.params.role}/${req.params.model}/create`;
            console.log(...params);
            res.render(`${req.params.role}/${req.params.model}/create`, ...params);
        }

    } else {
        params[0]['action'] = `/backend/${req.params.role}/${req.params.model}/create`;
        res.render(`${req.params.role}/${req.params.model}/create`, { layout: false });
    }

})
router.post('/:role/:model/create', isLoggedIn, user().any(), async (req, res) => {

    const control = new Controllers(req);
    console.log('requested body', req.body);
    try {
        switch (req.params.model) {
            case 'applications':
                // let data = req.body;
                data['userId'] = req.session.passport.user.id;
                data['code'] = Math.round(Math.random() * 1000000);
                // console.log(data);
                // let newData = await control.create('applications', req.body);
                // console.log('==========>>>>>>>', newData)
                res.status(200).json({ status: true, notification: 'successfully added!', data: await newData });
                break;
            case 'users':

                break;
            default:
                if (req.params.model.includes('_')) {

                    return res.status(200).json({ status: true, notification: 'successfully added ' + (req.params.model.replace('_', ' ')), data: await control.create(req.params.model, req.body) });
                    break;
                }
                res.status(200).json({ status: true, notification: 'successfully added ' + req.params.model, data: await control.create(req.params.model, req.body) });
                break;
        }
    } catch (error) {
        res.status(500).json({ status: false, notification: 'error' + error.message })
    }
    // let data = await (await control.create('applications', req.body));
    // console.log(await data);
    // res.render('dashboard', { layout: false, applications: data })
});
router.get('/applications/list', isLoggedIn, async (req, res) => {
    const control = new Controllers(req);

    let data = await (await control.single('users', { where: { id: req.session.passport.user.id }, include: { model: models['applications'] } }));
    // console.log(await data);
    res.render('partials/applications', { layout: false, applications: data.applications })
});


module.exports = router;