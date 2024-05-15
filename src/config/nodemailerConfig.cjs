const nodemailer = require('nodemailer');
require('dotenv').config();

// Transport to send email via nodemailer

const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

module.exports = { transporter };
