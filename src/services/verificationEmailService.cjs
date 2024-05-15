const { createHmac } = require('node:crypto');
const { Verification } = require('../model/verificationModel.cjs');

const generateHash = (userParam) => {
    const secret = 'PinkFloyd1994';
    const hashCode = createHmac('sha256', `${secret}`)
        .update(`${userParam}-${Date.now()}`)
        .digest('hex');
    return hashCode;
};

const createVerifiCode = async (userId) => {
    const hashCode = generateHash(userId);
    const newVerifiCode = new Verification({
        code: hashCode,
        active: true,
        userId,
    });
    return newVerifiCode;
};

module.exports = {
    createVerifiCode,
    generateHash,
};
