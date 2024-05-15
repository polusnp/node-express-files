const multer = require('multer');
const { MAX_AVATAR_SIZE } = require('../helpers/constants.cjs');
const { tempAvatarFolder } = require('../helpers/avatarFolder.cjs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempAvatarFolder);
    },
    filename: function (req, file, cb) {
        const name = file.originalname;
        cb(null, name);
    },
});

const uploadAvatarMiddleware = multer({
    storage,
    limits: { fileSize: MAX_AVATAR_SIZE },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true);
            return;
        }
        cb(null, false);
    },
});

module.exports = { uploadAvatarMiddleware };
