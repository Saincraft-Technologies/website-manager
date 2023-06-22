
const dotenv = require('dotenv');
const http = require('http');
const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const flash = require('express-flash');
const { passportInit, authenticateUser, authUser } = require('./passport/passport');
// const LocalStrategy = require('passport-local').Strategy;
const app = require('./applications/app');

dotenv.config({ path: './config/config.env' });
const cors = require('cors');

const models = require("./database/models/module_exporter");
app.use(cors({
    origin: ['https://captain.builds.saincrafttechnologies.com', 'https://website-manager.builds.saincrafttechnologies.com', process.env.D_PUBLIC],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use('/public', express.static(path.resolve(__dirname + '/public')));
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine('hbs', engine({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: require('./helpers/handle_bar').helpers,
    registerPartial: "home",
    extname: '.hbs',
    registerPartial: 'settings'
}));
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    authenticateUser));

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
    passReqToCallback: true
}, authUser));

passport.serializeUser(function (user, done) {
    return done(null, user);
});

passport.deserializeUser(function (user, done) {
    // console.log('am deserializing', user.id);
    try {
        return done(null, user);
    } catch (err) {
        return done(err)
    }
});
app.use(passport.initialize());
app.use(passport.session())
// console.log(path.resolve(__dirname + '/config/config.env'));
app.use(flash());

require('./routeManager')(app);
const Query = require('./database/queries');
const executiveQueries = require('./database/executiveQueries');
// app.use('/auth', require('./backend/routes/auth'));
// require('./passport/passport')(passport);
// const executiveQueries = require('./database/executiveQueries');
// routeManager(app);

const port = process.env.PORT || 3001;
const _env = process.env.NODE_ENV;

http.createServer(app)
    .listen(port, async () => {
        let Q = new Query();
        await Q.syncTable();
        if (process.env.DB_ACTION == 'create') {
            await executiveQueries();// this is commented!
        }
        console.log(`server running in ${_env} mode on port ${port}`);
    });
