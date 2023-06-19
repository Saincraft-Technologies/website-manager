const { apiLimit, hasToken } = require('./passport/passport');

const isApi = async (req, res, next) => {
    switch (req.originalUrl) {
        case '/':
            res.redirect('/backend');
            break;
        default:
            next()
            break;
    }
}
module.exports = async (app) => {
    app.use('/', isApi);
    await app.use('/backend', require('./routes/landing'));
    await app.use('/auth', require('./routes/auth'));
    await app.use('/api', hasToken, require('./routes/api'));
}