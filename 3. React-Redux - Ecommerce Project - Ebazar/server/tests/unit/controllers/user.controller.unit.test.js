const httpStatus = require("http-status");
const { apiUtil } = require("../../../src/utils");
const { User } = require("../../../src/model/user.model");
const { mockRequest, mockResponse, mockNext } = require('../../mocks/user.mock');
const { updateUser, fetchUserById } = require('../../../src/controller/user.controller')

jest.mock('../../../src/model/user.model');
jest.useFakeTimers()

describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllTimers();
    })

    describe('fetchUserById', () => {

        test('should fetch user by ID and return user data', async () => {
            // Mocked user data
            const mockUser = {
                _id: '12345',
                name: 'John Doe',
                email: 'john@example.com',
                addresses: [],
                role: 'user',
                phone: '1234567890',
                image: 'profile.jpg',
                orders: [],
                address: '123 Street Name',
            };

            // Set up the request and response objects
            const req = mockRequest({
                user: { id: '12345' },
            });
            const res = mockResponse();
            const next = mockNext();

            // Mock User.findById to return the mockUser data
            User.findById.mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockUser),
            });

            // Call the fetchUserById function
            await fetchUserById(req, res, next);

            // Assertions
            expect(User.findById).toHaveBeenCalledWith('12345', "name email id addresses role phone image orders address");
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockUser);
            expect(next).not.toHaveBeenCalled();
        });

        test('should throw an error if user is not found', async () => {
            // Set up the request and response objects
            const req = mockRequest({
                user: { id: '12345' },
            });
            const res = mockResponse();
            const next = mockNext();

            // Mock User.findById to return null
            User.findById.mockReturnValue({
                exec: jest.fn().mockResolvedValue(null),
            });

            // Call the fetchUserById function
            await fetchUserById(req, res, next);
            await jest.runAllTimersAsync()

            // Assertions
            expect(User.findById).toHaveBeenCalledWith('12345', "name email id addresses role phone image orders address");
            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should call next with an error if User.findById throws an error', async () => {
            // Set up the request and response objects
            const req = mockRequest({
                user: { id: '12345' },
            });
            const res = mockResponse();
            const next = mockNext();

            // Mock User.findById to throw an error
            User.findById.mockReturnValue({
                exec: jest.fn().mockRejectedValue(new Error('Database error')),
            });

            // Call the fetchUserById function
            await fetchUserById(req, res, next);
            await jest.runAllTimersAsync()

            // Assertions
            expect(User.findById).toHaveBeenCalledWith('12345', "name email id addresses role phone image orders address");
            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

    });

    describe('updateUser', () => {

        test('should update the user and return updated data', async () => {
            // Mocked updated user data
            const mockUpdatedUser = {
                id: '12345',
                name: 'Updated Name',
                email: 'updated@example.com',
                addresses: [],
                role: 'user',
                phone: '1234567890',
                image: 'updated-profile.jpg',
                address: '456 New Street Name',
            };

            // Set up the request, response, and next objects
            const req = mockRequest({
                params: { id: '12345' },
                body: { name: 'Updated Name' }, // The update data
            });
            const res = mockResponse();
            const next = mockNext();

            // Mock User.findByIdAndUpdate to return the updated user data
            User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

            // Call the updateUser function
            await updateUser(req, res, next);

            // Assertions
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith('12345', req.body, { new: true });
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith({
                id: mockUpdatedUser.id,
                email: mockUpdatedUser.email,
                role: mockUpdatedUser.role,
                addresses: mockUpdatedUser.addresses,
                address: mockUpdatedUser.address,
                name: mockUpdatedUser.name,
                phone: mockUpdatedUser.phone,
                image: mockUpdatedUser.image,
            });
            expect(next).not.toHaveBeenCalled();
        });

        test('should throw an error if the user is not found', async () => {
            // Set up the request, response, and next objects
            const req = mockRequest({
                params: { id: '12345' },
                body: { name: 'Updated Name' }, // The update data
            });
            const res = mockResponse();
            const next = mockNext();

            // Mock User.findByIdAndUpdate to return null, simulating a non-existent user
            User.findByIdAndUpdate.mockResolvedValue(null);

            // Call the updateUser function
            await updateUser(req, res, next);
            await jest.runAllTimersAsync()

            // Assertions
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith('12345', req.body, { new: true });
            expect(next).toHaveBeenCalledWith(expect.any(apiUtil.ApiError));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should call next with an error if User.findByIdAndUpdate throws an error', async () => {
            // Set up the request, response, and next objects
            const req = mockRequest({
                params: { id: '12345' },
                body: { name: 'Updated Name' }, // The update data
            });
            const res = mockResponse();
            const next = mockNext();

            // Mock User.findByIdAndUpdate to throw an error
            User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

            // Call the updateUser function
            await updateUser(req, res, next);
            await jest.runAllTimersAsync()

            // Assertions
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith('12345', req.body, { new: true });
            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });


    });

})