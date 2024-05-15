const express = require('express');
const moviesRouter = express.Router();

const {
    getAllMoviesHandler,
    getOneMovieHandler,
    getMovieCollectHandler,
} = require('../controllers/moviesController.cjs');

moviesRouter.get('/collect', getMovieCollectHandler);
moviesRouter.get('/', getAllMoviesHandler);
moviesRouter.get('/:id', getOneMovieHandler);

module.exports = moviesRouter;
