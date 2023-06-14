const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'sessionSecret123324',
    resave: false,
    saveUninitialized: true,
    // store: new SessionStore(),
    cookie: { secure: false, maxAge: 60 * 60 * 1000 },
}));


module.exports = app;
