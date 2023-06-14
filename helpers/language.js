const fs = require('fs');
const path = require('path');
const languages = require('../../database/models/languages');
const translations = require('../../database/models/transalations');
const express = require('express');
const { isLoggedIn } = require('../../passport/passport');
const { default: axios } = require('axios');
const router = express.Router();
// console.log(languageFolder_path);

const addLang = async (code, language) => {
    /**
     * add language to the database
     */
    try {

        await languages.create({ name: language, abbreviation: code });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
var setLanguage = async (code) => {
    return code;
};
var getLanguage = async (code) => {
    return code;
};
/** add a phrase to language translation */
const addPhrase = async (code = "en" || new String(), phrase) => {
    let lang = JSON.parse(JSON.stringify(await languages.findOne({ where: { abbreviation: code } })));
    let trans = await translations.create({ phrase: phrase, translation: phrase, languageId: lang.id });
    return await trans ? await trans.translation : null;
};

const translate = async (code, phrase) => {

    return new Promise(async (resolve, reject) => {
        try {

            let tphrase = '';
            (code != undefined) ? code : 'en';
            let lang = await languages.findOne({ where: { abbreviation: code } })
            lang = JSON.parse(JSON.stringify(await lang));
            let trans = await translations.findOne({ where: { languageId: lang.id, phrase: phrase } })
            trans = JSON.parse(JSON.stringify(await trans));
            // console.log('am at translation', trans);
            tphrase = trans.translation;
            resolve(await tphrase.toString());
        } catch (err) {
            console.log(err);
            reject('language not found with error: ' + err.message);
        }
    })
};
const phrase = (code, phrase, cb) => {
    translate(code, phrase).then(ans => {
        console.log('answer first', ans);
        return cb(null, ans);
    }).catch(err => {
        console.log(err)
        return cb(err);
    });
}
// translate('sw', "login").then((word)=>{
//     console.log(word);
// }).catch((err)=>{
//     console.log(err);
// });

module.exports = { getLanguage, addLang, addPhrase, phrase }
