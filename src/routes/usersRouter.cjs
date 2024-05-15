const express = require('express');
const usersRouter = express.Router();
const {
    validateData,
    userSchema,
} = require('../middlewares/usersValidations.cjs');
const { authGuard } = require('../middlewares/authGuard.cjs');
const { uploadAvatarMiddleware } = require('../middlewares/fileUpload.cjs');

const {
    getCurrentUserHandler,
    getAllUsersHandler,
    getOneUserHandler,
    postNewUserHandler,
    putOneUserHandler,
    deleteUserHandler,
    getFavoriteMoviesHandler,
    postFavoriteMovieHandler,
} = require('../controllers/usersController.cjs');

// FAVORITE USER'S MOVIES

usersRouter.get('/favorites', authGuard, getFavoriteMoviesHandler);
usersRouter.post('/favorites/:movieId', authGuard, postFavoriteMovieHandler);

// CRUD & CURRENT USER

usersRouter.get('/', getAllUsersHandler);
usersRouter.post('/', validateData(userSchema), postNewUserHandler);
usersRouter.get('/current', authGuard, getCurrentUserHandler);
usersRouter.get('/:id', getOneUserHandler);
usersRouter.put('/:id', validateData(userSchema), putOneUserHandler);
usersRouter.delete('/:id', deleteUserHandler);

// USER'S AVATAR OPTIONS

usersRouter.patch(
    '/avatars',
    authGuard,
    uploadAvatarMiddleware.single('avatar'),
    patchUserAvatarHandler
);

module.exports = usersRouter;
