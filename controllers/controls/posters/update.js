const models = require('../../../database/models/module_exporter');
const Controllers = require('../control');
module.exports = async (req, res, next) => {
    const control = new Controllers(req);
    console.log('requested body', req.body);
    try {
        switch (req.params.model) {
            case 'applications':
                // let data = req.body;
                data['userId'] = req.session.passport.user.id;
                data['code'] = Math.round(Math.random() * 1000000);
                // console.log(data);
                // let newData = await control.create('applications', req.body);
                // console.log('==========>>>>>>>', newData)
                res.status(200).json({ status: true, notification: 'successfully updated!', data: await newData });
                break;
            case 'users':

                break;
            default:
                if (req.params.model.includes('_')) {

                    return res.status(200).json({ status: true, notification: 'successfully updated ' + (req.params.model.replace('_', ' ')), data: await control.update(req.params.model, req.body, { where: { id: req.params.id } }) });
                    break;
                }
                res.status(200).json({ status: true, notification: 'successfully updated ' + req.params.model, data: await control.update(req.params.model, req.body, { where: { id: req.params.id } }) });
                break;
        }
    } catch (error) {
        res.status(500).json({ status: false, notification: 'error' + error.message })
    }
}