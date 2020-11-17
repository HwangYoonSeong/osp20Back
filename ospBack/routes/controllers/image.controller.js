const multer = require('multer');
const { formatDate } = require('../../js/formatDate');
const fs = require('fs');
const path = require('path');

module.exports.imageUpload = function (path) {

    const imageStorage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path);
        },
        filename: function (req, file, callback) {
            //console.log(file.originalname);
            callback(null, formatDate(new Date()) + '_' + file.originalname);
        }
    });

    const upload = multer({

        storage: imageStorage
    });

    return upload
}
