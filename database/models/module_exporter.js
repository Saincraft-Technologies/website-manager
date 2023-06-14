

const addresses = require("./systems/addresses");
const authentications = require("./systems/authentications");
// const certificates = require("./systems/certificates");
const contacts = require("./systems/contacts");
const countries = require("./systems/countries");
const regions = require("./systems/regions");
const roles = require("./systems/roles");
const users = require("./systems/users");
const { user_contacts } = require("./users/user_contacts");
const { user_addresses } = require("./users/user_addresses");
const { contact_authentications } = require("./users/contact_authentications");
const applications = require("./systems/websites");
const uploads = require("./systems/uploads");
const locales = require("./systems/locales");
const regulators = require('./systems/regulators');
const businesses = require("./businesses/businesses");
const item_categories = require("./articles/article_sections");
const items = require("./articles/articles");
const menus = require('./systems/menus');
const { role_menus } = require("./roles/role_menus");
const { role_permissions } = require("./roles/role_permissions");
const permissions = require("./systems/permissions");
const categories = require("./system_properties/pages");
const user_role_permissions = require("./roles/user_role_permissions");
const sections = require("./sections/sections");
const websites = require("./systems/websites");
const messages = require("./system_properties/messages");
const pages = require("./system_properties/pages");
const contents = require("./contents/contents");
const articles = require("./articles/articles");
const article_sections = require("./articles/article_sections");


module.exports = {
    sections,
    websites,
    messages,
    pages,
    contents,
    articles,
    article_sections,
    regulators,
    user_role_permissions,
    categories,
    permissions,
    role_menus,
    role_permissions,
    menus,
    item_categories,
    items,
    businesses,
    applications,
    locales,
    uploads,
    contact_authentications,
    roles,
    users,
    user_addresses,
    user_contacts,
    regions,
    contacts,
    countries,
    addresses,
    authentications
}
