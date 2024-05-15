const {
    postLoginUserHandler,
} = require('../src/controllers/authController.cjs');
const httpMocks = require('node-mocks-http');
const { loginUser } = require('../src/services/authService.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/services/authService.cjs');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('postLoginUserHandler', () => {
    it('should return 200 status and a success message with token if credentials are valid', async () => {
        // Prepeare
        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        });
        const response = httpMocks.createResponse();
        const nextFunction = jest.fn();

        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('fakeToken');
        loginUser.mockResolvedValue('fakeToken');

        // Execution
        await postLoginUserHandler(request, response, nextFunction);

        // Check
        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toEqual({
            status: 'success',
            token: 'fakeToken',
        });
        expect(nextFunction).not.toBeCalled();
    });

    it('should call next with an error if credentials are invalid', async () => {
        // Prepeare
        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/login',
            body: {
                email: 'wrong@example.com',
                password: 'wrongPassword',
            },
        });
        const response = httpMocks.createResponse();
        const nextFunction = jest.fn();

        bcrypt.compare.mockResolvedValue(false);
        loginUser.mockRejectedValue(new Error('Invalid credentials'));

        // Execution
        await postLoginUserHandler(request, response, nextFunction);

        // Check
        expect(nextFunction).toBeCalledWith(new Error('Invalid credentials'));
    });
});
