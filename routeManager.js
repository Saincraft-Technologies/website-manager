const { apiLimit, hasToken } = require('./passport/passport');


module.exports = async (app) => {
    app.use('/',  require('./routes/landing'));
    await app.use('/backend', require('./routes/landing'));
    await app.use('/auth', require('./routes/auth'));
    await app.use('/api', require('./routes/api'));
}