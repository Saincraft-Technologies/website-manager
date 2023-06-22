const { UUIDV4 } = require("sequelize");
const { Model, DataTypes, sequelize } = require("../../mysql");
const galleries = require("./galleries");
const uploads = require("../systems/uploads");
class gallery_uploads extends Model { };
/** relative table for point provision! */
gallery_uploads = sequelize.define('gallery_uploads', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
    }
}, { paranoid: true });
galleries.belongsToMany(uploads, { through: gallery_uploads });
uploads.belongsToMany(galleries, { through: gallery_uploads });
galleries.hasMany(gallery_uploads);
uploads.hasMany(gallery_uploads);
gallery_uploads.belongsTo(galleries);
gallery_uploads.belongsTo(uploads);
module.exports = gallery_uploads;