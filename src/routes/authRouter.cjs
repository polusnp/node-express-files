const express = require('express');
const router = express.Router();
const {
    validateData,
    credentialUserSchema,
    createUserSchema,
    forgotPasswordSchema,
} = require('../middlewares/usersValidations.cjs');
const {
    postRegisterUserHandler,
    postLoginUserHandler,
    getVerifiUserHandler,
    postRepeatVerifiUserHandler,
    postForgotPasswordHandler,
    getResetPasswordHandler,
} = require('../controllers/authController.cjs');

router.post(
    '/register',
    validateData(createUserSchema),
    postRegisterUserHandler
);
router.post('/verify', postRepeatVerifiUserHandler);
router.get('/verification/:code', getVerifiUserHandler);
router.post('/login', validateData(credentialUserSchema), postLoginUserHandler);
router.post(
    '/forgot',
    validateData(forgotPasswordSchema),
    postForgotPasswordHandler
);
router.get('/forgot/:token', getResetPasswordHandler);

module.exports = router;
