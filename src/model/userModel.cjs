const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            min: 2,
            required: true,
        },
        lastName: {
            type: String,
            min: 2,
            required: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9]{8,}$/.test(value);
                },
                message: () =>
                    `Password must be at least 8 characters long and contain only letters and numbers`,
            },
        },
        resetPasswordToken: {
            type: String,
            required: false,
        },
        resetPasswordExpires: {
            type: Date,
            required: false,
        },
        confirmed: {
            type: Boolean,
            required: true,
            default: false,
        },
        avatarURL: {
            type: String,
        },
        phone: {
            type: String,
            validate: {
                validator: function (value) {
                    return /^(\+38)?\d{10}$/.test(value);
                },
                message: (props) => `${props.value} is not valid phone number!`,
            },
            required: false,
        },
        favoriteMovies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie',
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

userSchema.pre('save', async function () {
    if (this.$isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

const User = mongoose.model('user', userSchema);

module.exports = { User };
