const httpStatus = require("http-status");
const { apiUtil } = require("../../../src/utils");
const { Product } = require("../../../src/model/product.model");
const { createProduct, fetchAllQuery, fetchProductsById, updateProduct } = require("../../../src/controller/product.controller");

jest.mock('../../../src/model/product.model');
jest.useFakeTimers()

describe('Product Controller', () => {
    afterEach(() => {
        jest.clearAllTimers();
    })

    describe('createProduct', () => {

        let req, res, next;

        beforeEach(() => {
            req = {
                body: {
                    name: 'Smartphone',
                    price: 999,
                    description: 'A high-end smartphone',
                    category: 'Electronics',
                    stock: 50,
                }
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            next = jest.fn();
        });

        test('should create product successfully', async () => {
            const mockProduct = {
                _id: '1',
                ...req.body,
            };

            // Mock the Product constructor and save method
            Product.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockProduct)
            }));

            await createProduct(req, res, next);

            // Assertions
            expect(Product).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
            expect(next).not.toHaveBeenCalled();
        });

        test('should handle validation errors', async () => {
            const mockError = new apiUtil.ApiError(httpStatus.BAD_REQUEST, 'Validation failed');

            // Mock the save method to reject with a validation error
            Product.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(mockError)
            }));

            await createProduct(req, res, next);
            await jest.runAllTimersAsync();
            // Assertions
            expect(Product).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should handle database errors', async () => {
            const mockError = new Error('Database error');

            Product.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(mockError)
            }));

            await createProduct(req, res, next);
            await jest.runAllTimersAsync();

            expect(Product).toHaveBeenCalledWith(req.body);
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('fetchAllQuery', () => {
        let req, res, next;

        beforeEach(() => {
            req = { query: {} };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            next = jest.fn();
        });

        test('should fetch products for user role', async () => {
            const mockProducts = [{ _id: '1', name: 'Product 1' }, { _id: '2', name: 'Product 2' }];

            req.query.role = 'user';
            Product.find.mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockProducts)
            });

            await fetchAllQuery(req, res, next);

            expect(Product.find).toHaveBeenCalledWith({ deleted: { $ne: true } });
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
            expect(next).not.toHaveBeenCalled();
        });

        test('should fetch all products for admin role', async () => {
            const mockProducts = [{ _id: '1', name: 'Product 1' }, { _id: '2', name: 'Product 2' }];

            req.query.role = 'admin';
            Product.find.mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockProducts)
            });

            await fetchAllQuery(req, res, next);

            expect(Product.find).toHaveBeenCalledWith();
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
            expect(next).not.toHaveBeenCalled();
        });

        test('should sort products by query parameters', async () => {
            const mockProducts = [{ _id: '1', name: 'Product 1' }, { _id: '2', name: 'Product 2' }];

            req.query.role = 'user';
            req.query._sort = 'name';
            req.query._order = 'asc';
            Product.find.mockReturnValue({
                sort: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockProducts)
            });

            await fetchAllQuery(req, res, next);

            expect(Product.find).toHaveBeenCalled();
            expect(Product.find().sort).toHaveBeenCalledWith({ name: 'asc' });
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
            expect(next).not.toHaveBeenCalled();
        });

        test('should filter products by category', async () => {
            const mockProducts = [{ _id: '1', name: 'Product 1' }, { _id: '2', name: 'Product 2' }];

            req.query.role = 'user';
            req.query.category = 'Electronics,Books';
            Product.find.mockReturnValue({
                find: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockProducts)
            });

            await fetchAllQuery(req, res, next);

            expect(Product.find().find).toHaveBeenCalledWith({ category: { $in: ['Electronics', 'Books'] } });
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
            expect(next).not.toHaveBeenCalled();
        });

        test('should filter products by brand', async () => {
            const mockProducts = [{ _id: '1', name: 'Product 1' }, { _id: '2', name: 'Product 2' }];

            req.query.role = 'user';
            req.query.brand = 'Apple,Samsung';
            Product.find.mockReturnValue({
                find: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockProducts)
            });

            await fetchAllQuery(req, res, next);

            expect(Product.find().find).toHaveBeenCalledWith({ brand: { $in: ['Apple', 'Samsung'] } });
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
            expect(next).not.toHaveBeenCalled();
        });

        test('should paginate products', async () => {
            const mockProducts = [{ _id: '1', name: 'Product 1' }, { _id: '2', name: 'Product 2' }];
            
            req.query._page = 2;
            req.query.role = 'user';
            const pageSize = 10;

            Product.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockProducts),
            });

            await fetchAllQuery(req, res, next);

            expect(Product.find().skip).toHaveBeenCalledWith(pageSize * (2 - 1)); 
            expect(Product.find().limit).toHaveBeenCalledWith(pageSize); 
            expect(Product.find().exec).toHaveBeenCalled(); 
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
            expect(next).not.toHaveBeenCalled();
        });

    });

    describe('fetchProductsById', () => {
        let req, res, next;

        beforeEach(() => {
            req = { params: { id: '123' } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            next = jest.fn();
        });

        test('should fetch product by ID successfully', async () => {
            const mockProduct = { _id: '123', name: 'Product 1' };

            Product.findById.mockResolvedValue(mockProduct);

            await fetchProductsById(req, res, next);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
            expect(next).not.toHaveBeenCalled();
        });

        test('should return 404 if product not found', async () => {
            Product.findById.mockResolvedValue(null);

            await fetchProductsById(req, res, next);
            await jest.runAllTimersAsync();

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(next).toHaveBeenCalledWith(new apiUtil.ApiError(httpStatus.NOT_FOUND, 'Product not found'));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should handle errors correctly', async () => {
            const mockError = new Error('Database error');
            Product.findById.mockRejectedValue(mockError);

            await fetchProductsById(req, res, next);
            await jest.runAllTimersAsync();

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('updateProduct', () => {
        let req, res, next;

        beforeEach(() => {
            req = { params: { id: '123' }, body: { name: 'Updated Product' } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            next = jest.fn();
        });

        test('should update product successfully', async () => {
            const mockUpdatedProduct = { _id: '123', name: 'Updated Product' };

            Product.findByIdAndUpdate.mockResolvedValue(mockUpdatedProduct);

            await updateProduct(req, res, next);

            expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated Product' }, { new: true });
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(mockUpdatedProduct);
            expect(next).not.toHaveBeenCalled();
        });

        test('should return 404 if product not found', async () => {
            Product.findByIdAndUpdate.mockResolvedValue(null);

            await updateProduct(req, res, next);
            await jest.runAllTimersAsync();

            expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated Product' }, { new: true });
            expect(next).toHaveBeenCalledWith(new apiUtil.ApiError(httpStatus.NOT_FOUND, 'Product not found'));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test('should handle errors correctly', async () => {
            const mockError = new Error('Database error');
            Product.findByIdAndUpdate.mockRejectedValue(mockError);

            await updateProduct(req, res, next);
            await jest.runAllTimersAsync();

            expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated Product' }, { new: true });
            expect(next).toHaveBeenCalledWith(mockError);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
})