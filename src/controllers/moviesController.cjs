const {
    getAllMovies,
    getMovieById,
    moviesAggregation,
    getTotalMovies,
} = require('../services/moviesService.cjs');
const { statusCode } = require('../helpers/constants.cjs');

const getAllMoviesHandler = async (req, res, next) => {
    const {
        skip,
        limit,
        sortBy = 'year',
        sortOrder = 'desc',
        name,
    } = req.query;

    const skipInt = parseInt(skip, 10) || 0;
    const limitInt = parseInt(limit, 10) || 10;
    const sortOrderValue = sortOrder === 'desc' ? -1 : 1;
    const sortOptions = { [sortBy]: sortOrderValue };

    const searchOptions = name ? { name: new RegExp(name, 'i') } : {};

    try {
        const allMovies = await getAllMovies(
            skipInt,
            limitInt,
            sortOptions,
            searchOptions
        );

        const totalItems = await getTotalMovies(searchOptions);
        res.status(statusCode.OK).json({
            items: allMovies,
            meta: { skip: skipInt, limit: limitInt, totalItems },
        });
    } catch (error) {
        next(error);
    }
};

const getOneMovieHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const movie = await getMovieById(id);
        if (!movie) {
            return next({
                status: statusCode.NOT_FOUND,
                message: `Not found movie`,
            });
        }
        res.status(statusCode.OK).json(movie);
    } catch (error) {
        next(error);
    }
};

const getMovieCollectHandler = async (req, res, next) => {
    try {
        const moviesCollect = await moviesAggregation();
        res.status(statusCode.OK).json(moviesCollect);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMoviesHandler,
    getOneMovieHandler,
    getMovieCollectHandler,
};
