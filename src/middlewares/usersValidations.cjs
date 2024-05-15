const Joi = require('joi');
const { statusCode } = require('../helpers/constants.cjs');

const createUserSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .min(2)
        .max(30)
        .pattern(/^[A-Za-z]+$/)
        .label('Valid first name (letters only, no spaces, 2-30 characters)'),
    lastName: Joi.string()
        .required()
        .min(2)
        .max(30)
        .pattern(/^[A-Za-z]+$/)
        .label('Valid last name (letters only, no spaces, 2-30 characters)'),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: false },
        })
        .required()
        .regex(/.*@.*\.com$/)
        .label('Invalid credentials'),
    password: Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{8,}$'))
        .label('Invalid credentials'),
});

const credentialUserSchema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: false },
        })
        .required()
        .regex(/.*@.*\.com$/)
        .label('Invalid credentials'),
    password: Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{8,}$'))
        .label('Invalid credentials'),
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: false },
        })
        .required()
        .regex(/.*@.*\.com$/)
        .label('Invalid credentials'),
});

const validateData = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = {
    validateData,
    credentialUserSchema,
    createUserSchema,
    forgotPasswordSchema,
};
