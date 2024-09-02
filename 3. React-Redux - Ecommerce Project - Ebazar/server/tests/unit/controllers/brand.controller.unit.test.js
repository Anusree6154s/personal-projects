const {
    reqMock,
    resMock,
    mockSavedBrand,
    mockBrandData
} = require("../../mocks/brand.mock");

const { createBrand, fetchBrands } = require("../../../src/controller/brand.controller");
const httpStatus = require("http-status");
const { Brand } = require("../../../src/model/brand.model");



describe('Brand Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = reqMock
        res = { ...resMock }
        next = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('createBrand', () => {
        test('should create a new brand and return it in the response', async () => {
            Brand.prototype.save.mockResolvedValue(mockSavedBrand)

            await createBrand(req, res, next);

            expect(Brand).toHaveBeenCalledWith(mockBrandData);
            expect(res.statusCode).toBe(httpStatus.CREATED);
            expect(res.jsonData).toBe(mockSavedBrand);
        });

        test('should handle errors when saving the brand fails', async () => {
            Brand.prototype.save.mockImplementation(() => {
                throw new Error('Save failed')
            })

            await createBrand(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(next.mock.calls[0][0].message).toBe('Save failed');
        });
    });

    describe("fetchBrands", () => {
        test("should fetch all brands and return them in the response", async () => {
            Brand.find.mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockSavedBrand)
            });

            await fetchBrands(req, res, next);

            expect(Brand.find).toHaveBeenCalled();
            expect(res.statusCode).toBe(httpStatus.OK);
            expect(res.jsonData).toBe(mockSavedBrand);
        });

        test("should handle errors when fetching brands fails", async () => {
            const error = new Error("Fetch failed");
            Brand.find.mockReturnValue({
                exec: jest.fn().mockImplementation(()=>{
                    throw error
                })
            });

            await fetchBrands(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.statusCode).toBe(null);
            expect(res.jsonData).toBe(null);
        });
    });
})