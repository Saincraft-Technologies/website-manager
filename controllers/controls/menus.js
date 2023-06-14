const Controllers = require("../controls/control");
const { Op } = require("../../database/mysql");
const models = require("../../database/models/module_exporter");
module.exports = {
    index: async (req, res) => {
        // console.log('req', req.url);
        res.render('menus/index', { layout: false });
    },
    list: async (req, res) => {
        try {
            const control = new Controllers(req);
            let data = await (await control.find('menus', { include: { model: models.roles } }));
            console.log('menu data her:::', req.session.passport.user);
            let role = await (await control.find('roles'));
            // console.log('menus daddadadada', data);
            res.render('menus/list', { layout: false, menus: data, roles: role, role: req.session.passport.user.role });
        } catch (err) {
            if (err.message == 'user not authenticated!') {
                res.redirect('/');
            }
        }
    },
    create: async (req, res) => {
        const control = new Controllers(req);

        if (req.method == 'GET' && req.url == '/create') {
            let roles = await (await control.find('roles', { where: {} }));
            let parents = await (await control.find('menus', { where: { parent: 0 } }));
            // console.log(await parents);
            res.render('menus/create', { layout: false, parents: await parents, roles: roles });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    let data = req.body;
                    data['parent'] = data.parentId;
                    // console.log('----->', data);
                    await (await control.create('menus', data));
                    res.json({ status: true, notification: 'successfully added menu!' })
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to add menu: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {
        const control = new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let parents = await (await control.find('menus', { where: { parent: 0 } }));
            let menu = await (await control.single('menus', { where: { id: req.params.id } }));

            let roles = await (await control.find('roles', { where: {} }));
            res.render('menus/edit', { layout: false, menu: menu, roles: roles, parents: parents });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    let data = req.body;
                    data['parent'] = data.parentId;
                    // console.log(data);
                    await (await control.update('menus', data, { where: { id: req.params.id } }));
                    res.json({ status: true, notification: 'successfully updated menu!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update menu: ' + err.message })
                }
            }
        }

    },
    delete: async (req, res) => {
        try {
            const control = new Controllers(req);
            await (await control.delete('menus', { where: { id: req.params.id } }));
            res.status(200).json({ status: true, notification: 'successfully removed menu!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: false, notification: 'failed to remove menu' });
        }
    },

    permanentDelete: async (req, res) => {
        try {
            await models.menus.destroy({ where: { id: req.params.id }, paranoid: false })
            res.status(200).json({ status: true, notification: 'successfully removed menu!' });
        } catch (error) {
            res.status(500).json({ status: false, notification: 'failed to remove menu!' });
        }
    },

    visibility: async (req, res) => {
        try {
            const control = await new Controllers(req);
            let current = await (await control.single('menus', { where: { id: req.body.menuId }, include: { model: models.roles } }));
            let roleExist = [];
            for (const role of current.roles) {
                if (role.id == req.body.roleId) {
                    roleExist.push(role);
                }
            }
            if (roleExist.length <= 0) {
                let menu = await models.menus.findOne({ where: { id: req.body.menuId } });
                let role = await models.roles.findOne({ where: { id: req.body.roleId } });
                await menu.addRole(role);
            } else {

                let roleMenu = await (await control.single('role_menus', { where: { menuId: req.body.menuId, roleId: roleExist[0].id } }));
                console.log(await roleMenu);
                await (await control.delete('role_menus', { where: { id: roleMenu.id } }));
            }
            res.json({ status: true, notification: 'successfully update menu!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to update menu: ' + err.message })
        }

    }
}