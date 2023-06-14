var multer = require('multer');
const path = require('path');
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

// create s3 instance using S3Client 
// (this is how we create s3 instance in v3)
const pdfFileUrl = 'storekeeperapp/public/uploads/files/pdf/';
const csvFileUrl = 'storekeeperapp/public/uploads/csv/';
const userImageUrl = 'storekeeperapp/public/uploads/images/users/';
const galleryImageUrl = 'storekeeperapp/public/uploads/images/users/';
const businessStampUrl = 'storekeeperapp/public/uploads/images/stamps/';
const logoUrl = 'storekeeperapp/public/uploads/images/logos/';
const imageUrl = 'storekeeperapp/public/uploads/images/';
const s3 = new S3Client({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://fra1.digitaloceanspaces.com",
    region: "fra-1",
    credentials: {
        accessKeyId: "DO00XRHCZJXNHVCLM3BD", // store it in .env file to keep it safe
        secretAccessKey: "Q/ocb3SsC7/85rYcjff5hEXcKqI2+hw6mpniz7KptlA"
    }
})
const s3StorageUser = multerS3({
    s3: new S3Client({
        forcePathStyle: false, // Configures to use subdomain/virtual calling format.
        endpoint: "https://fra1.digitaloceanspaces.com",
        region: "fra-1",
        credentials: {
            accessKeyId: "DO00XRHCZJXNHVCLM3BD", // store it in .env file to keep it safe
            secretAccessKey: "Q/ocb3SsC7/85rYcjff5hEXcKqI2+hw6mpniz7KptlA"
        }
    }), // s3 instance
    bucket: "saincrafttechnologies-static-public-2023", // change it as per your project requirement
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = userImageUrl + req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const s3StorageLogo = multerS3({
    s3: new S3Client({
        forcePathStyle: false, // Configures to use subdomain/virtual calling format.
        endpoint: "https://fra1.digitaloceanspaces.com",
        region: "fra-1",
        credentials: {
            accessKeyId: "DO00XRHCZJXNHVCLM3BD", // store it in .env file to keep it safe
            secretAccessKey: "Q/ocb3SsC7/85rYcjff5hEXcKqI2+hw6mpniz7KptlA"
        }
    }),
    bucket: "saincrafttechnologies-static-public-2023", // change it as per your project requirement
    prefix: logoUrl,
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = logoUrl + req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const s3StorageGallery = multerS3({
    s3: s3, // s3 instance
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://fra1.digitaloceanspaces.com",
    region: "fra-1",
    bucket: "saincrafttechnologies-static-public-2023", // change it as per your project requirement
    prefix: galleryImageUrl,
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = galleryImageUrl + req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const s3StorageStamp = multerS3({
    s3: s3,
    bucket: "saincrafttechnologies-static-public-2023", // change it as per your project requirement
    prefix: businessStampUrl,
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = businessStampUrl + '/' + req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const s3StorageCsv = multerS3({
    s3: s3, // s3 instance
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://fra1.digitaloceanspaces.com",
    region: "fra-1",
    bucket: "saincrafttechnologies-static-public-2023", // change it as per your project requirement
    prefix: csvFileUrl,
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = csvFileUrl + req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const s3StorageFilePDF = multerS3({
    s3: s3,
    bucket: "saincrafttechnologies-static-public-2023", // change it as per your project requirement
    prefix: pdfFileUrl,
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = pdfFileUrl + req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});

function sanitizeImage(file, cb) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];
    const MimeFile = ["image", "immage"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.split("/")[0];

    if (isAllowedExt && MimeFile.includes(isAllowedMimeType)) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}
function sanitizeFileCsv(file, cb) {
    // Define the allowed extension
    const fileExts = [".csv"];
    const MimeFile = ["application/vnd.ms-excel"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    // const isAllowedMimeType = file.mimetype.split("/")[0];
    const isAllowedMimeType = file.mimetype ? "application/vnd.ms-excel" : false;

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}
function sanitizeFilePDF(file, cb) {
    // Define the allowed extension
    const fileExts = [".pdf"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype ? "application/pdf" : false;

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}
// our middleware
// const uploadImage = multer({
//     storage: s3Storage,
//     fileFilter: (req, file, callback) => {
//         sanitizeImage(file, callback)
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2 // 2mb file size
//     }
// })

function upload() {
    this.user = () => {
        if (process.env.NODE_ENV == 'production') {
            return multer({
                storage: s3StorageUser,
                fileFilter: (file, callback) => {
                    sanitizeImage(file, callback)
                },
                limits: {
                    fileSize: 1024 * 1024 * 20 // 2mb file size
                }
            });
        } else {
            return multer({
                storage: multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, './public/uploads/images/users')
                    },
                    filename: (req, file, cb) => {
                        const fileName = new Date().toISOString() + '_' + file.fieldname+ path.extname(file.originalname);
                        cb(null, fileName);
                    }
                }),
                fileFilter: (req, file, callback) => {
                    sanitizeImage(file, callback);
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        }
    }
    this.businessStamp = () => {
        if (process.env.NODE_ENV == 'production') {

            return multer({
                storage: s3StorageStamp,
                fileFilter: (req, file, callback) => {
                    sanitizeImage(file, callback)
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        } else {
            return multer({
                storage: multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, './public/uploads/images/stamps')
                    },
                    filename: (req, file, cb) => {
                        const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
                        cb(null, fileName);
                    }
                }),
                fileFilter: (req, file, callback) => {
                    sanitizeImage(file, callback);
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        }
    }

    this.businessLogo = () => {
        if (process.env.NODE_ENV == 'production') {
            return multer({
                storage: s3StorageLogo,
                fileFilter: (req, file, callback) => {
                    sanitizeImage(file, callback)
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        } else {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, path.resolve('./public/uploads/images/logos'))
                },
                filename: (req, file, cb) => {
                    const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
                    cb(null, fileName);
                }
            });
            return multer({
                storage: storage,
                fileFilter: (req, file, callback) => {
                    sanitizeImage(file, callback);
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        }
    }
    this.gallery = () => {
        if (process.env.NODE_ENV == 'production') {
            return multer({
                storage: s3StorageGallery,
                fileFilter: (req, file, callback) => {
                    sanitizeImage(file, callback)
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        } else {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, path.resolve('./public/uploads/images/gallery'))
                },
                filename: (req, file, cb) => {
                    const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
                    cb(null, fileName);
                }
            });
            return multer({
                storage: storage,
                fileFilter: (req, file, callback) => {
                    sanitizeImage(file, callback);
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        }
    }

    this.userCsv = () => {
        if (process.env.NODE_ENV == 'production') {
            return multer({
                storage: s3StorageCsv,
                fileFilter: (req, file, callback) => {
                    sanitizeFileCsv(file, callback)
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        } else {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, './public/uploads/csv')
                },
                filename: (req, file, cb) => {
                    const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
                    cb(null, fileName);
                }
            });
            return multer({
                storage: storage,
                fileFilter: (req, file, callback) => {
                    sanitizeImage(file, callback);
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        }
    }
    this.pdf = () => {
        if (process.env.NODE_ENV == 'production') {
            return multer({
                storage: s3StorageFilePDF,
                fileFilter: (req, file, callback) => {
                    sanitizeFilePDF(file, callback)
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        } else {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, path.resolve('./public/uploads/files/pdf'))
                },
                filename: (req, file, cb) => {
                    const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
                    cb(null, fileName);
                }
            });
            return multer({
                storage: storage,
                fileFilter: (req, file, callback) => {
                    sanitizeImage(file, callback);
                },
                limits: {
                    fileSize: 1024 * 1024 * 2 // 2mb file size
                }
            });
        }
    }

};

module.exports = new upload();