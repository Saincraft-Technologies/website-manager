const models = require("../models/module_exporter");

const MAIN = [];
var main = {
    indexes: [],
    lists: []
};
// roles
main.indexes.push([`role`]);
main.lists.push([['superadmin'], ['admin'], ['employer'], ['employee'], ['generic']]);
MAIN.push([models.roles, main]);
var main = {
    indexes: [],
    lists: []
};
// permissions
main.indexes.push([`permission`, `descriptions`]);
main.lists.push([['all', 'all permissions'], ['read', 'permission to read only!'], ['write', 'permission to write!'], ['delete', 'permission to delete!']]);
MAIN.push([models.permissions, main]);
var main = {
    indexes: [],
    lists: []
};
// role permissions
main.indexes.push([`handler`]);
main.lists.push([['all']]);
MAIN.push([models.role_permissions, main]);

main = {
    indexes: [],
    lists: []
};
main.indexes.push([`display_name`, `route_name`, `parent`, `icon`, 'superadmin', 'admin', 'employer', 'employee', 'is_addon', 'sort_order', 'unique_identifier']);
main.lists.push([
    ['Super-admin', '#', 0, 'mdi mdi-account-cog', null, 0, null],
    ['Dashboard', '#', 0, 'mdi mdi-store', null, 0, null],
    ['Management', '#', 0, 'mdi mdi-cog', null, 0, null],
    ['Accounts', '#', 0, 'mdi mdi-table', null, 0, null],
    ['Reports', '#', 0, 'mdi mdi-file-pdf-box', null, 0, null],
    ['Preferences', '#', 0, 'mdi mdi-wrench', null, 0, null],
    ['Settings', '#', 0, 'mdi mdi-cog', null, 0, null],
    ['Menus', '/menus/index', 7, 'mdi mdi-order-bool-descending-variant', null, 0, null],
    ['Roles', '/roles/index', 1, 'mdi mdi-account-star', null, 0, null],
    ['Pemissions', '/permissions/index', 1, 'mdi mdi-account-star-variant', null, 0, null],
    ['Role-Permissions', '/permissions/index', 1, 'mdi mdi-account-setting', null, 0, null],
    ['Users', '/users/index', 1, 'mdi mdi-account-multiple', null, 0, null],
    ['Locales', '/locales/index', 7, 'mdi mdi-translate', null, 0, null],
    ['Applications', '/applications/index', 7, 'mdi mdi-server-network', null, 0, null],
]);
MAIN.push([models.menus, main]);
main = {
    indexes: [],
    lists: []
};

// languages
main.indexes.push([`name`, 'language', 'language_abbr']);
main.lists.push([['US', 'English', 'en'], ['TZ', 'Swahili', 'sw']]);
MAIN.push([models.locales, main]);
main = {
    indexes: [],
    lists: []
};
// sessions
// main.indexes.push([`name`, 'start', 'active']);
// main.lists.push([[new Date().getFullYear(), new Date().toISOString(), 1]]);
// MAIN.push([models., main]);
// main = {
//     indexes: [],
//     lists: []
// };
// countries
main.indexes.push([`name`, 'initial', 'zip']);
main.lists.push([['United Republic of Tanzania', 'TZ', '+255']]);
MAIN.push([models.countries, main]);
main = {
    indexes: [],
    lists: []
};
// regions
main.indexes.push([`name`, 'code']);
main.lists.push([['Arusha', '30'], ['Kilimanjaro', '22'], ['Dar es salaam', '22'], ['Mwanza', '22'], ['Morogoro', '22'], ['Tanga', '22'], ['Mbeya', '22'], ['Iringa', '22'], ['Dodoma', '22'], ['Tabora', '22'], ['Mtwara', '22'], ['Manyara', '22']]);
MAIN.push([models.regions, main]);
main = {
    indexes: [],
    lists: []
};
// currencies
main.indexes.push([`name`, 'code', 'symbol']);
main.lists.push([['Tanzanian Shillings', 'TZS', '/=']]);
MAIN.push([models.currencies, main]);
main = {
    indexes: [],
    lists: []
};
// user
main.indexes.push([`name`, 'email', 'password', 'gender', 'birthdate', 'phone', 'address']);
main.lists.push([
    ['Gideon Sainyeye', 'gsainyeye@gmail.com', '@73N@', 'MALE', '1991-07-07', '+255658598333', 'P.O.Box 123'],
    ['Johnson Mollel', 'johnsonmollel@outlook.com', '@73N@', 'MALE', '1998-05-17', '+255755220249', 'P.O.Box 123'],
    ['Hussein Jx', 'husseincollege@gmail.com', '@73N@', 'MALE', '1998-05-17', '+255693391049', 'P.O.Box 123'],
]);
MAIN.push([models.users, main]);
var main = {
    indexes: [],
    lists: []
};
// user_role_permissions
main.indexes.push([`name`, 'email', 'role']);
main.lists.push([['system-owner', 'gsainyeye@gmail.com', 'superadmin'], ['ceo', 'johnsonmollel@outlook.com', 'superadmin']]);
MAIN.push([models.user_role_permissions, main]);
main = {
    indexes: [],
    lists: []
};
// applications
main.indexes.push([`dns`, 'owner', 'email', 'phone', 'key', 'app_secret', 'code', 'ip_address', 'response_format']);
main.lists.push([
    ['https://www.saincrafttechnologies.com', 'Saincraft Technologies', 'gsainyeye@gmail.com', '+255658598333', 'N3FLJBe8WKFUkJbGc0rO5DPPx1mEzlw0OZNcDwvQWE', 'lkij95t8vg0g958ghdfld03ir69gtjfkeurnfi4', '247', '::1', 'json'],
]);
MAIN.push([models.websites, main]);
main = {
    indexes: [],
    lists: []
};
// applications
main.indexes.push([`identifier`, 'id_length']);
main.lists.push([
    ['NIDA', 17],
]);
MAIN.push([models.regulators, main]);

// identities
main.indexes.push([`id_number`, 'issue_date', 'expire_date']);
main.lists.push([
    ['125452585245522853', new Date().setFullYear({ year: 2021, month: 8, date: 12 }), new Date().setFullYear({ year: 2025, month: 8, date: 12 })],
]);
MAIN.push([models.identities, main]);

// applications
main.indexes.push([`id_number`, 'issue_date', 'expire_date']);
main.lists.push([
    ['125452585245522853', new Date().toDateString(), new Date().toDateString()],
    ['125452585245522853', new Date().toDateString(), new Date().toDateString()],
]);
MAIN.push([models.user_identities, main]);

module.exports = MAIN;