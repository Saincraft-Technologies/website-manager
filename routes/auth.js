const express = require('express');
const router = express.Router();
const passport = require('passport');
// const i18n = require('../helpers/languages/i18n.config');
const { notLoggedIn } = require('../passport/passport');
router.get('/signin', notLoggedIn, (req, res) => {
    // console.log(req.cookies);
    (req.cookies.theme == undefined) ? res.cookie('theme', 'light') : req.cookies.theme;
    res.render('login', {
        layout: "auth", theme: req.cookies.theme,
    })
});
router.get('/signup', notLoggedIn, async (req, res) => {
    // let oldUser = JSON.parse(JSON.stringify(await (await new Finds())._businesses()));
    res.render('register', {
        layout: "auth",
        locale: 'en',
    })
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/backend',
    failureRedirect: '/auth/signin',
    failureFlash: true
}));

router.get('/logout', async (req, res) => {
    await req.logOut(async (err) => {
        if (!err) {
            await res.redirect('/auth/signin');
        }
    });
});
// router.post('/:id', route.settings);
// router.delete('/:id', route.settings);
// router.delete('/trash/:id', route.settings);

module.exports = router;