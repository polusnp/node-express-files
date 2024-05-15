const { transporter } = require('../config/nodemailerConfig.cjs');
const { ServiceUnavailableException } = require('../helpers/exceptions.cjs');
require('dotenv').config();

const SENDER = process.env.EMAIL;
const PORT = process.env.PORT;

const sendEmail = async (config) => {
    try {
        const { from = SENDER, to, subject, text, html } = config;

        const info = await transporter.sendMail({
            from,
            to,
            subject,
            text,
            html,
        });
        console.log(info);
    } catch (error) {
        console.error(error.message);
        throw new ServiceUnavailableException(error.message);
    }
};

const sendVerifiEmail = async (email, code) => {
    try {
        const verificationLink = `http://localhost:${PORT}/auth/verification/${code}`;
        const html = `<p>To verify your email please click on <a href="${verificationLink}">link</a></p>`;

        sendEmail({
            to: email,
            text: 'Verify your email',
            subject: 'Email verification',
            html,
        });
    } catch (error) {
        throw new ServiceUnavailableException(error?.response?.body);
    }
};

const sendForgotPassword = async (email, token) => {
    try {
        const link = `http://localhost:${PORT}/auth/forgot/${token}`;
        const html = `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.
    Please click on the following link, or paste this into your browser to complete the process:<br>
    <a href="${link}">link</a></p><br>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

        await sendEmail({
            to: email,
            text: 'Reset password',
            subject: 'Password reset service',
            html,
        });
    } catch (error) {
        throw new ServiceUnavailableException(error?.response?.body);
    }
};

module.exports = { sendVerifiEmail, sendForgotPassword };
