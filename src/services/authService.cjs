const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const { User } = require('../model/userModel.cjs');
const { Verification } = require('../model/verificationModel.cjs');
const {
    ConflictException,
    BadRequestException,
} = require('../helpers/exceptions.cjs');
const {
    createVerifiCode,
} = require('../services/verificationEmailService.cjs');
const {
    sendVerifiEmail,
    sendForgotPassword,
} = require('../services/sendEmailService.cjs');

const registerUser = async ({ email, firstName, lastName, password }) => {
    try {
        const existedUser = await User.findOne({ email });

        if (existedUser) {
            throw new ConflictException(
                'User with this email already register'
            );
        }

        const newUser = new User();
        const newVerifiCode = await createVerifiCode(newUser.id);
        Object.assign(newUser, {
            email,
            password,
            firstName,
            lastName,
        });
        await sendVerifiEmail(email, newVerifiCode.code);
        await newVerifiCode.save();
        await newUser.save();
    } catch (error) {
        throw error;
    }
};

const generateToken = (userId, userEmail) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

    const token = jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIME,
    });
    return token;
};

const verifyUser = async (code) => {
    try {
        const verificationCode = await Verification.findOne({
            code,
            active: true,
        });
        console.log(verificationCode);

        if (!verificationCode) {
            throw new BadRequestException('Invalid verification code');
        }

        const userToVerify = await User.findById(verificationCode.userId);

        if (!userToVerify) {
            throw new BadRequestException('Invalid verification code');
        }
        await userToVerify.updateOne({ confirmed: true });
        await verificationCode.deleteOne();
        await Verification.deleteMany({ active: false });
        return generateToken(userToVerify.id, userToVerify.email);
    } catch (error) {
        throw error;
    }
};

const repeatVerifyUser = async (email) => {
    try {
        if (!email) {
            throw new BadRequestException('missing required field email');
        }

        const user = await User.findOne({ email });

        if (!user || user.confirmed) {
            throw new ConflictException('Verification has already been passed');
        }

        const newVerifyCode = await createVerifiCode(user.id);
        await sendVerifiEmail(email, newVerifyCode.code);
        await newVerifyCode.save();
    } catch (error) {
        throw error;
    }
};

const loginUser = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email }).exec();
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!user || !isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_TIME,
        });
        return token;
    } catch (error) {
        throw error;
    }
};

const forgotPassword = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpire = Date.now() + 3600000;

        await user.updateOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: resetTokenExpire,
        });

        await sendForgotPassword(email, resetToken);
    } catch (error) {
        throw error;
    }
};

const validateResetToken = async (token) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            throw new BadRequestException(
                'Password reset token is invalid or has expired.'
            );
        }

        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyUser,
    repeatVerifyUser,
    forgotPassword,
    validateResetToken,
};
