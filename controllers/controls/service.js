
const crypto = require('crypto');
// const BaseUrl = require("../../../base");
const PASSWORD_LENGTH = 64;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha256';
const BYTE_TO_STRING_ENCODING = 'hex';


const capitalize = s => s.replace(/./, c => c.toUpperCase());
const pluralize = (noun) => {
    let Noun = new String(noun);
    console.log();
    if (Noun.endsWith(`y`)) {
        console.log('length', Noun.length);
        return Noun.slice(0, noun.length - 1) + 'ies';
    }
    if (Noun.endsWith(`fe`)) {
        console.log('length', Noun.length);
        return Noun.slice(0, noun.length - 2) + 'ives';
    }
    if (Noun.endsWith(`f`)) {
        console.log('length', Noun.length);
        return Noun.slice(0, noun.length - 1) + 'eves';
    }
    return noun + 's';
};
const singularize = (plural) => {
    let Noun = new String(plural);
    console.log();
    switch (Noun.charAt(plural.length - 2)) {
        case 'e':
            if (Noun.endsWith(`ies`)) {
                console.log('length', Noun.length);
                return Noun.slice(0, plural.length - 3) + 'y';
            }
            if (Noun.endsWith(`ives`)) {
                console.log('length', Noun.length);
                return Noun.slice(0, plural.length - 3) + 'fe';
            }
            if (Noun.endsWith(`eves`)) {
                console.log('length', Noun.length);
                return Noun.slice(0, plural.length - 3) + 'f';
            }
            if (Noun.endsWith(`ees`)) {
                console.log('length', Noun.length);
                return Noun.slice(0, plural.length - 1);
            }
            if (Noun.endsWith(`es`)) {
                console.log('length', Noun.length);
                return Noun.slice(0, plural.length - 1);
            }
            break;
        case `\ [a-zA-z] -g`:
            break;
        default:
            if (Noun.endsWith('s')) {
                console.log('other things');
                console.log('noun ===========>>>>>', Noun.slice(0, plural.length - 1));
                return Noun.slice(0, plural.length - 1);
            } else {
                return plural;
            }
            break;
    }
};

const generateUniqueIdentifier = async (initial = "SCT" || new String()) => {
    try {
        if (initial == "undefined") {
            let g = crypto.generateKeySync('hmac', { length: 36 });
            // console.log(g);
            return `STC-${g.export().toString('hex')}`;
        } else {
            let g = crypto.generateKeySync('hmac', { length: 31 });
            // console.log(await g.export().toString('hex'));
            return `${initial} - ${g.export().toString('hex')}`;;
        }
    } catch (err) {
        throw err;
    }
};
/**
 * random generator.
 * @function
 * @param {string} count - specifies the length of the output string.
 */
const generateRandom = async (count = 7 || new Number()) => {
    var _sym = 'BCDFGHJKLMNPQRSTVWXYZ1234567890';
    var str = '';

    for (var i = 0; i < count; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    };
    if (!str.length < count) {
        return str;                  // use the continuation
    } else {
        return null;
    };
};
const passwordHash = (password = new String()) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING);
        crypto.pbkdf2(password.toString('utf8'), salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (err, derivedKey) => {
            if (err) reject(err);
            // console.log(derivedKey.toString('hex'));
            var res = {
                hashHex: derivedKey.toString('hex'),
                hashBase64: derivedKey.toString('base64'),
                salt: salt,
                passwordLength: PASSWORD_LENGTH,
                iterations: ITERATIONS
            }
            resolve(res); // '3745e48...08d59ae'
        });
    });
};
/**
 * hash password with sha512-256.
 * @function
 * @param {string} password - List of required fields.
 */
const passwordHashVerify = (password = new String(), salt = new String(), dbHash = new String()) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (err, derivedKey) => {
            if (err) reject(err);
            // console.log(derivedKey.toString('hex'));
            var res = {
                hashHex: derivedKey.toString('hex'),
                hashBase64: derivedKey.toString('base64'),
                salt: salt,
                passwordLength: PASSWORD_LENGTH,
                iteration: ITERATIONS
            }
            if (dbHash == res.hashHex || dbHash == res.hashBase64) {
                resolve(true);
            } else {
                resolve(false)
            }// '3745e48...08d59ae'
        });
    });
};

const isEmpty = (object) => {
    try {
        return JSON.stringify(object) === '{}';
    } catch (err) {
        console.log(err.message);
    }
}

console.log(singularize('roles'))
module.exports = { isEmpty, generateRandom, generateUniqueIdentifier, passwordHash, passwordHashVerify, capitalize, pluralize, singularize };