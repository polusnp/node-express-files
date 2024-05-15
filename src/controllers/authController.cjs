const { statusCode } = require('../helpers/constants.cjs');
const {
    registerUser,
    loginUser,
    verifyUser,
    repeatVerifyUser,
    forgotPassword,
    validateResetToken,
} = require('../services/authService.cjs');

const postRegisterUserHandler = async (req, res, next) => {
    try {
        const body = req.body;
        await registerUser(body);
        res.status(statusCode.CREATED).json({ status: 'success' });
    } catch (error) {
        next(error);
    }
};

const getVerifiUserHandler = async (req, res, next) => {
    try {
        const code = req.params.code;
        const token = await verifyUser(code);
        res.status(statusCode.CREATED).json({ status: 'success', token });
    } catch (error) {
        next(error);
    }
};

const postRepeatVerifiUserHandler = async (req, res, next) => {
    try {
        const { email } = req.body;

        await repeatVerifyUser(email);
        res.status(statusCode.CREATED).json({
            message: 'repeat verification via email link',
        });
    } catch (error) {
        next(error);
    }
};

const postLoginUserHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const token = await loginUser(body);
        res.status(statusCode.OK).json({ status: 'success', token });
    } catch (error) {
        next(error);
    }
};

const postForgotPasswordHandler = async (req, res, next) => {
    try {
        const { email } = req.body;
        await forgotPassword(email);
        res.status(statusCode.OK).json({
            status: 'Instructions for resetting your password have been sent to your email',
        });
    } catch (error) {
        next(error);
    }
};

const getResetPasswordHandler = async (req, res) => {
    try {
        const { token } = req.params;
        await validateResetToken(token);

        res.status(200).json({
            status: 'success',
            message: 'Token is valid. You can now reset your password.',
            token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postRegisterUserHandler,
    postLoginUserHandler,
    getVerifiUserHandler,
    postRepeatVerifiUserHandler,
    postForgotPasswordHandler,
    getResetPasswordHandler,
};
