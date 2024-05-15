const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

const tempAvatarFolder = path.join(process.cwd(), process.env.UPLOAD_DIR);

const avatarFolder = path.join(
    process.cwd(),
    'public',
    process.env.AVATARS_FOLDER
);

const isAccesible = async (path) =>
    await fs
        .access(path)
        .then(() => true)
        .catch(() => false);

const creatFolderIsNotExist = async (folder) => {
    if (!(await isAccesible(folder))) {
        await fs.mkdir(folder);
    }
};

module.exports = {
    tempAvatarFolder,
    avatarFolder,
    creatFolderIsNotExist,
};
