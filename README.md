# User Management System with Authentication and CRUD Operations RESTful API

## Introduction

This repository contains the code for a project built using Express.js for the backend. The project implements a comprehensive User Management System with authentication features such as user registration, login, email verification, password reset, and CRUD (Create, Read, Update, Delete) operations for managing users. Additionally, it provides endpoints for managing movies, including fetching all movies and retrieving a single movie by ID. The project utilizes MongoDB as its database.

## Features

-   User registration with email verification
-   User login with JWT authentication
-   Email verification for new users
-   Password reset functionality
-   CRUD operations for users (Create, Read, Update, Delete)
-   Fetching all movies and retrieving a single movie by ID

## Requirements

-   Node.js
-   MongoDB

## Technologies Used

-   **Node.js**: A JavaScript runtime environment for running server-side JavaScript code.
-   **Express.js**: A web application framework for Node.js used for building APIs and web applications.
-   **MongoDB**: NoSQL database used for storing movie and user data.
-   **Mongoose**: MongoDB object modeling tool for Node.js, used for schema validation and interaction with the MongoDB database.
-   **Joi**: A powerful schema description language and data validator for JavaScript.
-   **JSON**: A lightweight data interchange format used for representing data in API requests and responses.
-   **Git**: A version control system used for tracking changes in the project's source code.
-   **GitHub**: A platform for hosting Git repositories and collaborating on software development projects.

## Accessing API Endpoints

You can access the API endpoints using a tool like Postman or cURL. Here are some key endpoints:

### Authentication

-   **Register a new user**: `POST /auth/register`
-   **Verify user email**: `GET /auth/verification/:code`
-   **Log in**: `POST /auth/login`
-   **Repeat verification email**: `POST /auth/verify`
-   **Forgot password**: `POST /auth/forgot`
-   **Reset password**: `GET /auth/forgot/:token`

### User Management

-   **Get all users**: `GET /users`
-   **Create a new user**: `POST /users`
-   **Get current user**: `GET /users/current`
-   **Get a specific user**: `GET /users/:id`
-   **Update a user**: `PUT /users/:id`
-   **Delete a user**: `DELETE /users/:id`
-   **Get favorite movies of a user**: `GET /users/favorites`
-   **Add a movie to user's favorites**: `POST /users/favorites/:movieId`

### Movie Management

-   **Get all movies**: `GET /movies`
-   **Get a specific movie**: `GET /movies/:id`
-   **Get movies by collection**: `GET /movies/collect`

## Project Structure

```markdown
-   src/
    -   controllers/
        -   authController.js
        -   moviesController.js
        -   usersController.js
    -   dataBase/
        -   connectionMongoDb.js
    -   errorHandlers/
        -   globalErrorHandler.js
        -   notFoundErrorHandler.js
    -   middlewares/
        -   authGuard.js
        -   usersValidations.js
    -   model/
        -   userModel.js
    -   routes/
        -   authRouter.js
        -   moviesRouter.js
        -   usersRouter.js
    -   services/
        -   authService.js
        -   moviesService.js
        -   userService.js
-   .env.example
-   .gitignore
-   package.json
-   server.js

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or found any issues, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```
