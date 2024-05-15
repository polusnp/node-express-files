const { User } = require('../model/userModel.cjs');

// CRUD & CURRENT USER SERVICE

const getUserData = async (email) => {
    try {
        const userData = await User.findOne({ email });
        return userData;
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
};

const addNewUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, body) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

const removeUser = async (id) => {
    try {
        const newUsersList = await User.findByIdAndDelete(id);
        return newUsersList;
    } catch (error) {
        throw error;
    }
};

// USER'S FAVORITE MOVIES SERVICE

const getFavoriteMovies = async (userId) => {
    try {
        const userMovies = await User.findById(userId)
            .populate('favoriteMovies')
            .exec();

        return userMovies.favoriteMovies;
    } catch (error) {
        throw error;
    }
};

const addMovieToFavorite = async (userId, movieId) => {
    try {
        const user = await User.findById(userId);

        if (user.favoriteMovies.includes(movieId)) {
            throw new Error('Movie existed in favorites');
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favoriteMovies: movieId } },
            { new: true, safe: true, upsert: false }
        ).populate('favoriteMovies');

        return updatedUser.favoriteMovies;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserData,
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    removeUser,
    getFavoriteMovies,
    addMovieToFavorite,
};
