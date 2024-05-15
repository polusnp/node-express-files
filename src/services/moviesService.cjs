const { Movie } = require('../model/movieModel.cjs');

const getAllMovies = async (skip, limit, sortOptions, searchOptions) => {
    try {
        const movies = await Movie.find(searchOptions)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);
        return movies;
    } catch (error) {
        throw error;
    }
};

const getTotalMovies = async (searchOptions) => {
    try {
        const totalItems = await Movie.countDocuments(searchOptions);
        return totalItems;
    } catch (error) {
        throw error;
    }
};

const getMovieById = async (id) => {
    try {
        const movie = await Movie.findById(id);
        return movie;
    } catch (error) {
        throw error;
    }
};

const moviesAggregation = async () => {
    try {
        const moviesCollect = await Movie.aggregate([
            { $match: { year: { $gt: 1994 } } },
            {
                $group: {
                    _id: '$genre',
                    movies: { $push: '$$ROOT' },
                    totalViews: { $sum: '$views' },
                    averageRating: { $avg: '$rating' },
                },
            },
            {
                $addFields: {
                    count: { $size: '$movies' },
                    averageRating: { $round: ['$averageRating', 2] },
                },
            },
            {
                $project: {
                    _id: 0,
                    genre: '$_id',
                    movies: 1,
                    totalViews: 1,
                    averageRating: 1,
                    count: 1,
                },
            },
        ]);

        return { items: moviesCollect };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    moviesAggregation,
    getTotalMovies,
};
