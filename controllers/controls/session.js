const models = require("../../database/models/module_exporter");


class Session {
    #_token;
    constructor(req) {
        this._request = req;
        // this.checkApp().then(r => r).catch(err => console.log("error", err));
    }
    async checkApp() {
        try {
            let app = await models['applications'].findAll({ where: { key: this._request.headers.authorization.split(' ')[1] } });
            let auth = JSON.parse(JSON.stringify(app));
            if (!auth.length <= 0) {
                // console.log('am checking2', auth);
                this._authorized = this._request.isAuthenticated();
                this.#_token = 'Bearer ' + auth[0].key;
                this._request.login({ key: this.#_token, app: auth[0] }, { session: false });
                return this._authorized;
            } else {
                // console.log('am checking3', auth);
                 this._request.logout(async (err) => {
                    if (err) {
                        console.log('error::', err);
                    }
                    this._authorized = false;
                    return false;
                });
                return false;
            }
        } catch (error) {
            console.log('error::', error);
            return false;
        }

    };
    endTokenUse() {
        this._request.logout();
        this._authorized = false;
    }
}
module.exports = Session;