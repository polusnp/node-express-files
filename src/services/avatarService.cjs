const path = require('path');
const fs = require('fs/promises');

const { User } = require('../model/userModel.cjs');
const { avatarFolder } = require('../helpers/avatarFolder.cjs');

const saveUserAvatar = async (file) => {
    const pathName = file.path;
    const newAvatar = file.originalname;
    try {
        await fs.rename(pathName, path.join(`${avatarFolder}`, newAvatar));
    } catch (error) {
        await fs.unlink(pathName);
        throw error;
    }
    return path.join(process.env.AVATARS_FOLDER, newAvatar).replace('\\', '/');
};

//

const updateAvatar = async (userId, file, avatar) => {
    try {
        const avatarURL = await saveUserAvatar(file, avatar);
        await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
        return avatarURL;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    updateAvatar,
};
