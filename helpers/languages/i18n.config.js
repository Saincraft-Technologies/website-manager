const i18n = require('i18n');
const path = require('path');
const { languages } = require('../../../database/models/module_exporter');
const translations = require('../../../database/models/system_properties/transalations');
const fs = require('fs').promises
// const translations = require('./models/translations'); /
// tra// path to your translations model

i18n.configure({
    locales: ['sw', 'en'],
    defaultLocale: 'sw',
    queryParameter: 'lang',
    directory: './backend/helpers/languages/',
    api: {
        "_": 'translate',
        "_n": 'translateN',
    },
});
let translatePath = __dirname;

// Custom translation function using Sequelize


const setValue = (value, lcl) => {
    let t = languages.findOne({ where: { abbreviation: lcl } })
        .then(language => JSON.parse(JSON.stringify(language)))
        .then(language => translations.findOne({ where: { translation: value, languageId: language.id } }))
        .then(translation => {
            translation = JSON.parse(JSON.stringify(translation));
            if (translation) {
                return translation.translation;
            } else {
                languages.findOne({ where: { abbreviation: lcl } }).then(lang => {

                    translations.create({ phrase: value, translation: value, languageId: lang.id }).then().catch(err => err);
                }).catch(err => err);
            }
        })
        .then(translation => {
            if (translation) {
                console.log("language translation translation::", translation);
                return translation.translation;
            } else {
                console.log("language translation translation::", translation);
                translations.create({ phrase: value, translation: value, languageId: language.id }).then().catch(err => err);

                return value;
            }
        })
        .catch(error => console.warn(error));

    return i18n.__(value);
};
// i18n.__ = setValue;

// Override the translate function in i18n



module.exports = i18n;
