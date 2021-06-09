const AWS = require('aws-sdk');
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const keys = require("../config/keys_dev")

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        return cb(null, true);

    } else {
        return cb(new Error("Invalid file type"), false);
    }
}

const upload = multer({
    fileFilter, 
    storage: multerS3({
        s3: keys.s3,
        acl: 'public-read',
        bucket: "ak-laceup-bucket",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        // metadata: function(req, file, cb) {
        //     cb(null, {fieldName: file.fieldName})
        // },
        key: function(req, file, cb) {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname)

            cb(null, `${Date.now().toString()}_${name}`)
        }
    })
})

module.exports = upload
