const { statusCode } = require('../helpers/constants.cjs');

const handleNotFound = (_, res) => {
    res.status(statusCode.NOT_FOUND).json({
        status: 'error',
        code: statusCode.NOT_FOUND,
        message: 'Not found',
    });
};

module.exports = handleNotFound;
