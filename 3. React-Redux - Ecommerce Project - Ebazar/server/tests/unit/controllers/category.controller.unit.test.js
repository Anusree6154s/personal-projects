const httpStatus = require('http-status');
const { Category } = require('../../../src/model/category.model');
const { createCategory, fetchCategories } = require('../../../src/controller/category.controller');

jest.mock('../../../src/model/category.model')
jest.useFakeTimers()

describe('Category Controller', () => {
    afterEach(() => {
        jest.clearAllTimers();
    })

    describe('createCategory', () => {
        let req, res, next;

        beforeEach(() => {
            req = { body: {} };
            res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            next = jest.fn();

            jest.clearAllMocks();
        });

        test('should create a category successfully', async () => {
            const mockCategoryData = { name: 'Electronics', _id: '12345' };

            // Mock the save method to resolve with mockCategoryData
            Category.prototype.save = jest.fn().mockResolvedValue(mockCategoryData);

            // Set request body
            req.body = { name: 'Electronics' };

            await createCategory(req, res, next);

            expect(Category.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith(mockCategoryData);
            expect(next).not.toHaveBeenCalled();
        });

        test('should handle errors during category creation', async () => {
            const mockError = new Error('Database error');

            // Mock the save method to reject with mockError
            Category.prototype.save = jest.fn().mockRejectedValue(mockError);

            // Set request body
            req.body = { name: 'Electronics' };

            await createCategory(req, res, next);

            await jest.runAllTimersAsync();

            expect(Category.prototype.save).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('Category Controller - fetchCategories', () => {
        let req, res, next;

        beforeEach(() => {
            req = {}; // No need to populate req for this endpoint
            res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            next = jest.fn();

            jest.clearAllMocks();
        });

        afterEach(() => {
            jest.clearAllTimers();
        })

        test('should fetch categories successfully', async () => {
            const mockCategories = [
                { _id: '1', name: 'Electronics' },
                { _id: '2', name: 'Books' }
            ];

            const exec = jest.fn().mockResolvedValue(mockCategories);
            Category.find = jest.fn().mockReturnValue({ exec });

            await fetchCategories(req, res, next);

            await jest.runAllTimersAsync();

            expect(Category.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockCategories);
            expect(next).not.toHaveBeenCalled();
        });

        test('should handle errors during category fetch', async () => {
            const mockError = new Error('Database error');

            const exec = jest.fn().mockRejectedValue(mockError);
            Category.find = jest.fn().mockReturnValue({ exec });

            await fetchCategories(req, res, next);

            await jest.runAllTimersAsync();

            expect(Category.find).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
})
