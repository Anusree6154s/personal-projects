
const request = require('supertest');
const setupTestDB = require('../utils/setupDB.js');
const server = require('../../src/server.js');
const { deleteUsers, insertUsers, dbDataOne } = require('../fixtures/user.fixtures.js');
const { product1, insertProducts, deleteProducts } = require('../fixtures/product.fixture.js')
const jwt = require('jsonwebtoken');
const { env } = require('../config/env.config.js');
const { WishList } = require('../../src/model/wishlist.model.js');
const { deleteWishlist, insertWishlist } = require('../fixtures/wishlist.fixtures.js');
const httpStatus = require('http-status');

setupTestDB();

describe("Cart routes", () => {
    let token;
    let userId;
    let productId;
    let wishlist;
    beforeAll(async () => {
        // create a user and use its _id to create a jwt token
        const data = await insertUsers(dbDataOne)
        userId = data._id.toString()

        token = jwt.sign({ id: data._id, ...data }, env.jwt.secret_key)

        const product = await insertProducts([product1])
        productId = product[0]._id.toString()

        wishlist = {
            user: userId,
            product: productId,
        }
    })

    afterAll(async () => {
        await deleteUsers();
        await deleteProducts()
    });

    describe('POST /api/wishlist', () => {
        beforeAll(async () => {
            await deleteWishlist()
        });

        test('should add an item to the wishlist and return the item with populated product', async () => {
            const res = await request(server)
                .post('/api/wishlist')
                .set('Cookie', [`jwt=${token}`])
                .send(wishlist)
                .expect(200);

            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('user', userId);
            expect(res.body.product).toHaveProperty('id', productId);

            const wishListInDb = await WishList.findById(res.body.id)
            expect(wishListInDb).not.toBeNull();
            expect(wishListInDb.product).not.toBeNull();
        });

        test('should return 400 if the product ID is invalid', async () => {
            const wishlistClone = { ...wishlist }
            wishlistClone.product = '123'

            const res = await request(server)
                .post('/api/wishlist')
                .set('Cookie', [`jwt=${token}`])
                .send(wishlistClone)
                .expect(400);

            expect(res.body.error).toMatch(/invalid/i);
        });

        test('should return 401 if the user is not authenticated', async () => {
            const res = await request(server)
                .post('/api/wishlist')
                .send(wishlist)
                .expect(401);

            expect(res.body.error).toMatch(/Authentication Failed/i);
        });
    });

    describe('GET /api/wishlist', () => {
        beforeAll(async () => {
            await deleteWishlist()

        });

        test('should return 200 and list of products in wishlist when items are present', async () => {
            await insertWishlist(wishlist)

            const response = await request(server)
                .get('/api/wishlist')
                .set('Cookie', [`jwt=${token}`])
                .expect(httpStatus.OK);

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('product');
        });

        test('should return 404 when no products are in the wishlist', async () => {
            await deleteWishlist()

            const response = await request(server)
                .get('/api/wishlist')
                .set('Cookie', [`jwt=${token}`])
                .expect(httpStatus.NOT_FOUND);

            expect(response.body.error).toBe('No products in wishlist.');
        });
    });

    describe('DELETE /api/wishlist/:id', () => {
        let wishlistId
        beforeAll(async () => {
            await deleteWishlist()
            const data = await insertWishlist(wishlist)
            wishlistId = data.id
        });

        test('should delete a wishlist item successfully', async () => {
            const res = await request(server)
                .delete(`/api/wishlist/${wishlistId}`)
                .set('Cookie', [`jwt=${token}`])
                .send();

            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toBe('Product deleted from wishlist.');

            const deletedItem = await WishList.findById(wishlistId);
            expect(deletedItem).toBeNull();
        });

        test('should return 404 if the wishlist item does not exist', async () => {
            const nonExistentId = '605c72ef1f2a2b001e8d6c6d'
            const res = await request(server)
                .delete(`/api/wishlist/${nonExistentId}`)
                .set('Cookie', [`jwt=${token}`])
                .send();

            expect(res.status).toBe(httpStatus.NOT_FOUND);
            expect(res.body.error).toBe('Wishlist item not found'); 
        });
    });
})