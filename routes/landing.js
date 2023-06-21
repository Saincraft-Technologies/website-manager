const express = require('express');
const router = express.Router();
const models = require('../database/models/module_exporter');
const { Op } = require('../database/mysql');
const Controllers = require('../controllers/controls/control');
const { isLoggedIn, hasToken, hasRoles } = require('../passport/passport');
const { user } = require('../multipart/multerConfig');
const { singularize, pluralize, isEmpty } = require('../controllers/controls/service');
const getCreate = require('../controllers/controls/getters/create');
const create = require('../controllers/controls/posters/create');
const index = require('../controllers/controls/getters/index');
const list = require('../controllers/controls/getters/list');
const update = require('../controllers/controls/posters/update');
const edit = require('../controllers/controls/getters/edit');
const { menus } = require('../controllers/helpers/helpers');

router.get('/', isLoggedIn, async (req, res) => {
    const acceptedRoles = ['superadmin', 'admin', 'manager', 'member'];
    const allowed = await hasRoles(acceptedRoles, req)
    if (allowed) {
        console.log("Allowed ===>>>", allowed);
        res.render('index', { route: `backend/${req.session.passport.user.role.role}/dashboard`, name: 'Dashboard', title: 'Dashboard', item: req.session.passport.user.role.role, viewManager: req.session.passport.user, menus: (await menus(models)).menu_main, sub_menu: (await menus(models)).sub_menu });
    } else {
        console.log('allowed ====>>>', allowed);
    };
});

router.get('/:role/dashboard', isLoggedIn, async (req, res) => {
    console.log('am here!!!!', req.params);
    const control = new Controllers(req);
    let data = await (await control.find('applications', {}));
    // console.log("passport user", req.session.passport.user);
    res.render(`${req.params.role}/dashboard`, { layout: false, viewManager: req.session.passport.user, applications: data, menus: (await menus(models)).menu_main, sub_menu: (await menus(models)).sub_menu })
});
router.get('/:role/:model/index', isLoggedIn, index);

router.get('/:role/:model/list', isLoggedIn, list);

router.get('/:role/:model/deleted', isLoggedIn, async (req, res) => {
    const control = new Controllers(req);
    console.log(req.query)
    /** other queries */
    let listHeaders = [];
    let entry = null;
    let update = null;
    let deleted = null;

    let list = await control.find(req.params.model, {});

    list.map((item, i) => {
        if (i == 0) {
            for (const header in item) {
                if (header != 'updatedAt' && header != 'id') {
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
    var param = [{ layout: false, route: `${req.session.passport.user.role.role}/${req.params.model}`, model: singularize(req.params.model) }];

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
router.get('/:role/:model/create', isLoggedIn, getCreate);
router.post('/:role/:model/create', isLoggedIn, user().any(), create);

router.get('/:role/:model/edit/:id', isLoggedIn,edit);

router.post('/:role/:model/edit/:id', isLoggedIn, user().any(), update);

router.get('/:role/:model/upload/:id', isLoggedIn, async (req, res) => {
    const control = new Controllers(req);
    let mmodel = await control.single(req.params.model, { where: { id: req.params.id }, include: [{ model: models['uploads'] }] });
    let upload = mmodel.upload;
    console.log('upload =====>>>>', mmodel);
    res.render(`${req.params.role}/${req.params.model}/upload`, { layout: false, action: `/backend/${req.params.role}/${req.params.model}/upload/${req.params.id}`, upload: upload });
});

router.post('/:role/:model/upload/:id', isLoggedIn, user().single('file'), async (req, res) => {
    const control = new Controllers(req);
    try {
        switch (req) {
            case 'files':
                if (req.body.fileId) {

                }
                console.log('fields::', req.files);
                res.status(200).json({ status: true, notification: 'successfully uploaded files!' });
                break;

            default:
                let data = req.file;
                if (req.body.fileId) {
                    let oldFile = await control.single('uploads', { where: { id: req.body.fileId } });
                    data['caption'] = req.body.caption;
                    await control.update('uploads', data, { where: { id: req.body.fileId } });
                    console.log(data);
                    /** delete file with multer */
                    /** currently using file system */

                    res.status(200).json({ status: true, notification: 'successfully updated upload file!' });
                } else {
                    if (data) {
                        data['caption'] = req.body.caption;

                        let file = await control.create('uploads', data);
                        console.log(file);
                        await control.update(req.params.model, { uploadId: file.id }, { where: { id: req.params.id } });
                        res.status(200).json({ status: true, notification: 'successfully uploaded file!' });
                    }
                }
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, notification: 'failed to upload file! ' + error.message });
    }
});
router.get('/applications/list', isLoggedIn, async (req, res) => {
    const control = new Controllers(req);

    let data = await (await control.single('users', { where: { id: req.session.passport.user.id }, include: { model: models['applications'] } }));
    // console.log(await data);
    res.render('partials/applications', { layout: false, applications: data.applications })
});

router.post('/:role/:model/visibility', isLoggedIn, async (req, res) => {
    try {
        const control = await new Controllers(req);
        switch (req.params.model) {
            case 'menus':
                let role_menu = await control.find('role_menus', { where: { menuId: req.body.menuId, roleId: req.body.roleId } });
                console.log('my role menu ===>>>>', role_menu);
                if (role_menu.length <= 0) {
                    await control.create('role_menus', { menuId: req.body.menuId, roleId: req.body.roleId })
                } else {
                    await control.delete('role_menus', { where: { menuId: req.body.menuId, roleId: req.body.roleId }, paranoid: false })
                }
                break;

            default:
                break;
        }
        res.status(200).json({ status: true, notification: 'successfully update menu!' })
    } catch (err) {
        res.status(500).json({ status: false, notification: 'failed to update menu: ' + err.message })
    }
});

module.exports = router;