const { statusCode } = require('../helpers/constants.cjs');

const handleGlobalErrors = (err, _, res, next) => {
    err.status = err.status ? err.status : statusCode.INTERNAL_SERVER_ERROR;
    res.status(err.status).json({
        status:
            err.status === statusCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
        code: err.status,
        message: err.message,
        data:
            err.status === statusCode.INTERNAL_SERVER_ERROR
                ? 'Internal Server Error'
                : err.data,
    });
};

module.exports = handleGlobalErrors;
