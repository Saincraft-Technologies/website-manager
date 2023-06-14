const express = require('express');
const router = express.Router();
const models = require('../database/models/module_exporter');
const { Op } = require('../database/mysql');
const Controllers = require('../controllers/controls/control');
const { hasToken, rateLimit, apiLimit } = require('../passport/passport');
const Getter = require('./getter');
const Poster = require('./poster');
// const requestor = require('../controllers/requestor');


router.get('/:model/list', /*apiLimit,*/ hasToken, async (req, res) => {
    console.log('am here');
    try {
        const getter = await new Getter(req);
        const response = await getter.get_v2();
        if (response.status) {
            res.status(200).setHeader('Content-Type', 'application/json').json(response);
        } else {
            res.status(500).setHeader('Content-Type', 'application/json').json(response);
        }

    } catch (err) {
        res.status(500).setHeader('Content-Type', 'application/json').json({ status: false, notification: 'failed!', data: null, error: err.message })
    }
});
router.get('/:model/of/:id', hasToken, async (req, res) => {
    const getter = await new Getter(req);
    res.status(200).setHeader('Content-Type', 'application/json').json(await getter.getId_v2());
});
router.get('/:model/auth/:email', apiLimit, hasToken, async (req, res) => {
    const getter = await new Getter(req);
    res.status(200).setHeader('Content-Type', 'application/json').json(await getter.getEmail_v2());
});


router.get('/deleted/:model/list', hasToken, async (req, res) => {
    const control = new Controllers(req);
    try {

        if (req.query.rel != undefined && req.query.rel != '') {
            let models = req.query.rel.split(',');
            var relationsArray = [];
            for (let model of models) {
                relationsArray.push({ model: models[model] });
            }
            return res.status(200).setHeader('Content-Type', 'application/json').json({ status: true, notification: 'successfully queried ' + req.params.model, data: await control.find(req.params.model, { where: { deletedAt: { [Op.not]: null } }, include: relationsArray, paranoid: false }) });
        }
        return res.status(200).setHeader('Content-Type', 'application/json').json({ status: true, notification: 'successfully queried ' + req.params.model, data: await control.find(req.params.model, { where: { deletedAt: { [Op.not]: null } }, paranoid: false }) });
    } catch (err) {
        console.log(err);
        return res.status(500).setHeader('Content-Type', 'application/json').json({ status: false, notification: err.message, data: null });
    }
});
router.post('/:model/create', async (req, res) => {
    try {
        const poster = await new Poster(req);
        const response = await poster.post_v2();
        if (response.status) {
            res.status(200).setHeader('Content-Type', 'application/json').json(response);
        } else {
            res.status(500).setHeader('Content-Type', 'application/json').json(response);
        }

    } catch (err) {
        res.status(500).setHeader('Content-Type', 'application/json').json({ status: false, notification: 'failed!', data: null, error: err.message })
    }
});

router.delete('/:model/:id', hasToken, async (req, res) => {
    const control = new Controllers(req);
    try {
        return res.status(200).setHeader('Content-Type', 'application/json').json({
            status: true, notification: 'successfully deleted ' + req.params.model,
            data: await control.delete(req.params.model, { where: { id: req.params.id } })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).setHeader('Content-Type', 'application/json').json({ status: false, notification: err.message, data: null });
    }
});

router.patch('/:model/:id', hasToken, async (req, res) => {
    const control = new Controllers(req);
    try {
        return res.status(200).setHeader('Content-Type', 'application/json').json({
            status: true, notification: 'successfully patched ' + req.params.model,
            data: await control.update(req.params.model, req.body, { where: { id: req.params.id } })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).setHeader('Content-Type', 'application/json').json({ status: false, notification: err.message, data: null });
    }
});
module.exports = router;