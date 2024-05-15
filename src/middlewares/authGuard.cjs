const { UnauthorizedException } = require('../helpers/exceptions.cjs');
const jwt = require('jsonwebtoken');
const { User } = require('../model/userModel.cjs');
require('dotenv').config();

// Bearer token

const authGuard = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException();
        }

        const jwtPayload = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: jwtPayload.id });

        if (!user) {
            throw new UnauthorizedException();
        }
        req.user = user;
        next();
    } catch {
        next(new UnauthorizedException());
    }
};

module.exports = { authGuard };
