
const RateLimit = require('../controllers/controls/rateLimit');
const { passwordHashVerify } = require('../controllers/controls/service');
const models = require('../database/models/module_exporter');
const rateLimit = require('express-rate-limit');

let date = new Date();
console.log('date string ====>>>>', date.toISOString().split('T')[0]);
let session = models['sessions']
module.exports = {
    authenticateUser: async function (req, email, password, done) {
        // 
        try {
            email = email.trim();
            // console.log(await contact_authentications.findAll({ where: { id: { email: email } }, include: { model: contacts, include: { model: users } } }));
            const contact = JSON.parse(JSON.stringify(await models.contacts.findOne({ where: { email: email }, include: [{ model: models.authentications }, { model: models.users, include: [{ model: models.role_permissions, include: [{ model: models.roles }] }, { model: models.locales }, { model: models.uploads }] }] })));
            console.log(await contact);
            // const session = JSON.parse(JSON.stringify(await models.financials.findOne({ where: { active: 1 } })));
            // const _user = JSON.parse(JSON.stringify(await user))[0];

            if (contact.users.length <= 0) {
                return done(null, false, { message: 'user do not exist!' });
            }
            const _user = await contact.users[0];
            let passVerify = await passwordHashVerify(password, contact.authentications[0].salt, contact.authentications[0].hash);
            if (_user.role_permissions.length > 0) {
                console.log(_user.role_permissions[0]);
                if (!_user.role_permissions[0].role) {

                } else {
                    let auth = JSON.parse(JSON.stringify(await models['websites'].findAll({ where: { key: process.env.D_API_KEY } })));

                    console.log('...password verified!', await passVerify, auth, process.env.D_API_KEY);
                    if (passVerify) {
                        let userData = {
                            id: _user.id,
                            name: _user.name,
                            email: contact.email,
                            role: _user.role_permissions[0].role,
                            userId: _user.id,
                            website: auth[0].dns,
                            owner: auth[0].owner,
                            language: _user.locale,
                            avatar: (_user.upload) ? _user.upload.path : null,
                            theme: 'light',
                            home: (_user.role_permissions[0].role.role.includes('superadmin')) ? '/backend/' + _user.role_permissions[0].role.role : (_user.role_permissions[0].role.role == 'admin') ? '/admin' : (_user.role_permissions[0].role.role.includes('dealer')) ? '/dealer' : (_user.role_permissions[0].role.role.includes('business')) ? '/business' : (_user.role_permissions[0].role.role.includes('warehouse')) ? '/warehouse' : (_user.role_permissions[0].role.role.includes('store')) ? '/store' : '/',
                        }
                        global.language = _user.locale[0];
                        console.log(userData);
                        return done(null, userData);
                    } else {
                        return done(null, false, {
                            message: 'incorrect password!'
                        });
                    };

                }
            }
        } catch (err) {
            console.log(err);
            return done(null, false, {
                message: 'User dont exist!'
            });
        }
    },
    isLoggedIn: async (req, res, next) => {
        try {
            if (req.isAuthenticated()) {
                let auth = JSON.parse(JSON.stringify(await models['websites'].findAll({ where: { key: process.env.D_API_KEY } })));
                console.log('auth', auth, process.env.D_API_KEY);
                if (!auth.length <= 0) {
                    console.log('authentifications', auth);
                    req.headers.authorization = 'Bearer ' + auth[0].key;
                    return next();
                }
            } else {
                return res.redirect('/auth/signin');
            }
        } catch (err) {
            console.log(err);
            return res.redirect('/auth/signin');
        }
    },
    hasToken: async (req, res, next) => {
        try {
            console.log(req.headers.authorization)
            let auth = JSON.parse(JSON.stringify(await models['websites'].findAndCountAll({ where: { key: req.headers.authorization.split(' ')[1] } })));

            console.log('auth', auth);
            if (auth.count > 0) {
                return next();
            } else {
                return res.status(203).setHeader('Content-Type', 'application/json').json({ status: false, notification: 'access denied for token!' });
            }
        } catch (err) {
            console.log(err);

            return res.status(203).setHeader('Content-Type', 'application/json').json({ status: false, notification: 'access denied for token!' });
        }
    },
    apiLimit: rateLimit({
        windowMs: 0.3 * 60 * 1000, // milliseconds - how long after lock out should you wait
        max: 1, // max number of recent connections during `window` milliseconds before sending a 429 response
        message: "Too many requests from ip address at once, please try again later in 5 minutes",
        statusCode: 429, // 429 status = Too Many Requests (RFC 6585)
        headers: true, //Send custom rate limit header with limit and remaining
        skipFailedRequests: false, // Do not count failed requests (status >= 400)
        skipSuccessfulRequests: false, // Do not count successful requests (status < 400)
        // allows to create custom keys (by default user IP is used)
        keyGenerator: function (req /*, res*/) {
            // console.log(req.ip);
            return req.ip;
        },
        skip: function (/*req, res*/) {
            return false;
        },
        handler: async function (req, res, next) {
            res.status(200).json({ status: true, notification: 'Too many requests from ip address at once, please try again later in ' + (0.3 * 60) + ' sec' });
            // return true
            // next()
            // res.end(new Buffer.from({ end: 'end' }));

        },
        onLimitReached: function (req, res) {
            // res.status(203).json({ status: false, notification: 'maximum number request limit reached!' });
        }

    }),
    notLoggedIn: async (req, res, next) => {
        try {
            if (req.isAuthenticated()) {
                console.log("my request::", req.session.passport.user.role);
                switch (req.session.passport.user.role.role) {
                    case 'superadmin':
                        res.redirect('/');
                        break;
                    case 'admin':
                        res.redirect('/');
                        break;

                    case 'distributor':
                        res.redirect('/');
                        break;
                    case 'client':
                        res.redirect('/');
                        break;
                    default:
                        req.logOut(async (err) => {
                            if (!err) {
                                await next();
                            }
                        });
                        break;
                }
            } else {
                await next();
                // return res.redirect('/auth/signin');
            }
        } catch (err) {
            console.log(err);
            return res.redirect('/auth/signin');
        }
    },
    hasRoles: async (rolesArray, req) => {
        if (!rolesArray.length <= 0) {
            return (rolesArray.includes(req.session.passport.user.role.role)) ? true : false;
        } else {
            return false;
        }
    }
} 
