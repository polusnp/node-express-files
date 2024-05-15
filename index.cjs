const express = require('express');
const usersRouter = require('./src/routes/usersRouter.cjs');
const moviesRouter = require('./src/routes/moviesRouter.cjs');
const authRouter = require('./src/routes/authRouter.cjs');
require('dotenv').config();
const handleNotFound = require('./src/errorHandlers/notFoundErrorHandler.cjs');
const handleGlobalErrors = require('./src/errorHandlers/globalErrorHandler.cjs');
const { connectDataBase } = require('./src/dataBase/connectionMongoDb.cjs');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

//General handle not found errors and all other errors

app.use(handleNotFound);
app.use(handleGlobalErrors);

//To run the server and connect to the mongodb data base

const port = process.env.PORT || 3000;

const connectToMongoDB = async () => {
    try {
        await connectDataBase();
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

connectToMongoDB();
