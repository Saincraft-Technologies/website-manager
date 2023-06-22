

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
const content_sections = require("./sections/content_sections");
const members = require("./members/members");
const teams = require("./members/teams");
const bills = require("./systems/bills");
const charges = require("./systems/charges");
const methods = require("./systems/methods");
const sessions = require("./systems/sessions");
const usages = require("./systems/usages");
const payments = require("./systems/payments");
const packages = require("./tours/packages");
const attractions = require("./tours/attractions");
const bookings = require("./tours/bookings");
const accounts = require("./systems/accounts");
const feedbacks = require("./tours/feedbacks");
const attraction_galleries = require("./tours/attraction_galleries");
const galleries = require("./tours/galleries");
const gallery_uploads = require("./tours/gallery_uploads");
const points = require("./tours/points");
const point_galleries = require("./tours/point_galleries");
const point_provisions = require("./tours/point_provisions");
const itineraries = require("./tours/itineraries");

module.exports = {
    attraction_galleries,
    galleries,
    gallery_uploads,
    points,
    point_galleries,
    point_provisions,
    itineraries,
    accounts,
    feedbacks,
    packages,
    attractions,
    bookings,
    bills,
    charges,
    methods,
    sessions,
    usages,
    payments,
    members,
    teams,
    content_sections,
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
