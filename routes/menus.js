const express = require('express');
const models = require('../database/models/module_exporter');
const router = express.Router();
const menus = require('../controllers/controls/menus');
const { isLoggedIn } = require('../passport/passport');

router.get('/', isLoggedIn, menus.index);
router.get('/list', isLoggedIn, menus.list);
router.get('/create', isLoggedIn, menus.create);
router.post('/create', isLoggedIn, menus.create);
router.post('/visibility', isLoggedIn, menus.visibility);
router.get('/edit/:id', isLoggedIn, menus.edit);
router.post('/edit/:id', isLoggedIn, menus.edit);
// router.get('/list', isLoggedIn, route.settings); 
// router.get('/create', isLogsgedIn, route.settings);
// router.get('/:id', isLoggedIn, route.settings);
// router.post('/', isLoggedIn, upload.single('logo'), route.settings);
// router.post('/:id', isLoggedIn, route.settings);
router.delete('/delete/:id', isLoggedIn, menus.delete);
// router.delete('/trash/:id', isLoggedIn, route.settings);

module.exports = router;