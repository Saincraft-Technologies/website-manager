const { passwordHash } = require('../controllers/controls/service');
const models = require('./models/module_exporter');
const { Op } = require('./mysql');
module.exports = async executeInitialQueries => {
    const userIds = [];
    const roleIds = [];
    const userIdss = [];
    try {

        const MAIN = require('./seeds/rearranger');
        // await (MAIN.map((main) => {
        //     console.log(main);
        // }))
        for (const _main in MAIN) {
            for (const array in MAIN[_main][1].lists) {
                for (const array1 in MAIN[_main][1].lists[array]) {
                    console.log('i tried here:::::', MAIN[_main][1].lists[array][array1]);
                    // console.log('started');
                    let dataObject = {};
                    for (const key in MAIN[_main][1].indexes) {
                        // console.log(MAIN[_main][1].indexes[key][0], MAIN[_main][1].lists[array]);
                        // dataObject[MAIN[_main][1].indexes[key]] = null;
                        for (const key1 in MAIN[_main][1].indexes[key]) {
                            // console.log('main key',MAIN[_main][1].indexes[key][key1]);
                            dataObject[MAIN[_main][1].indexes[key][key1]] = MAIN[_main][1].lists[array][array1][key1];

                        }
                    }
                    console.log(dataObject);
                    switch (MAIN[_main][0]) {
                        case models.roles:
                            console.log(dataObject);
                            try {
                                console.log('...creating roles::');
                                await models.roles.create(dataObject);
                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;
                        case models.permissions:
                            try {
                                console.log('...creating permissions::', dataObject);
                                await models.permissions.create(dataObject);
                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;

                        case models.role_permissions:
                            try {
                                console.log('...creating role_permissions::', dataObject, roleIds);
                                let roles = await (await models.roles.findAll({ where: { role: 'superadmin' } }));
                                if (!roles.length <= 0) {
                                    dataObject['roleId'] = roles[0].id;
                                    await (await models.permissions.findAll()).map(async (permission, i) => {
                                        if (i == 0) {
                                            dataObject['permissionId'] = permission.id;
                                        }
                                    });
                                }
                                await models.role_permissions.create(dataObject);
                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;
                        case models.locales:
                            try {
                                // console.log('...creating locales::', dataObject);
                                await models.locales.create(dataObject);

                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;

                        case models.financials:
                            try {
                                console.log('...creating financials::');
                                await models.financials.create(dataObject);
                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;

                        case models.countries:
                            try {
                                console.log('...creating regions::');
                                await models.countries.create(dataObject);
                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;
                        case models.user_identities:
                            try {
                                await models.user_identities.create(dataObject);

                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;
                        case models.identities:
                            try {
                                await models.identities.create(dataObject);

                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;
                        case models.menus:
                            try {
                                // console.log('...creating menus::', dataObject);
                                await (await models.roles.findAll({ where: { id: 1 } })).map(async (role) => {
                                    let menu = await models.menus.create(dataObject);
                                    await menu.addRole(role);
                                });
                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;
                        case models.users:
                            try {
                                // console.log('...creating users::', await role);
                                // var session = await sessions.findOne({ where: { id: 1 } });
                                let its = await passwordHash('@73N@');
                                its['hash'] = its.hashHex;

                                var lang = await models.locales.findOne({ where: { id: 1 } });
                                dataObject['localeId'] = await lang.id;
                                var user = await models.users.build(dataObject);
                                await user.save();
                                var contact = await models.contacts.build(dataObject);
                                await contact.save();
                                await user.addContact(await contact);
                                var auth = await models.authentications.build(its);
                                await auth.save();
                                await contact.addAuthentication(await auth);
                                var address = await models.addresses.build(dataObject);
                                await address.save();
                                await user.addAddress(await address);


                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;

                        case models.user_role_permissions:
                            try {
                                // if (userIds.length <= 0) {
                                dataObject['rolePermissionId'] = await (await models.role_permissions.findAll()).at(0).getDataValue('id');
                                await (await models.contacts.findAll({ where: { email: dataObject.email }, include: [{ model: models.users }] })).map(async (contact, i) => {
                                    if (contact.email == dataObject.email) {
                                        dataObject['userId'] = contact.users[0].id;
                                    }
                                });
                                // console.log('...creating user_role_permissions::', dataObject);
                                await models.user_role_permissions.build(dataObject).save();
                                userIds.push(user.id)
                                // }
                                break;

                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;
                        case models.websites:
                            try {
                                await (await models.contacts.findAll({ where: { email: dataObject.email }, include: [{ model: models.users }] })).map(async (contact, i) => {
                                    if (contact.email == dataObject.email) {
                                        dataObject['userId'] = contact.users[0].id;
                                        dataObject['regionId'] = 1;
                                    }
                                });
                                userIdss.push(user.id);
                                await models.websites.create(dataObject);
                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;
                        case models.regions:
                            try {
                                var country = await models.countries.findOne({ where: { id: 1 } });
                                dataObject['countryId'] = country.id;
                                // console.log('...creating regions::', dataObject);
                                await models.regions.create(dataObject);
                                break;
                            } catch (error) {
                                if (error.message) {
                                    // if (!error.message.includes('Validation error')) {
                                    //     throw error;
                                    // }
                                    console.log(error.message);
                                }
                            }
                            break;

                        default:
                            break;
                    }
                }
            }
        }
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}