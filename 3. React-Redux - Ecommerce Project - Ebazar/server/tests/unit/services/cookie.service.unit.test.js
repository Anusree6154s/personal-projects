const { cookieExtractor } = require('../../../src/services/controller.services/cookie.service')


describe('Cookie Service Unit Test', () => {
    describe('cookieExtractor function', () => {

        test('should return the JWT token if it exists in cookies', () => {
            const req = {
                cookies: {
                    jwt: 'sample_jwt_token',
                },
            };

            const result = cookieExtractor(req);
            expect(result).toBe('sample_jwt_token');
        });

        test('should return null if there are no cookies in the request', () => {
            const req = {};

            const result = cookieExtractor(req);
            expect(result).toBeNull();
        });

        test('should return null if the request is undefined', () => {
            const result = cookieExtractor(undefined);
            expect(result).toBeNull();
        });

        test('should return null if the request does not contain cookies', () => {
            const req = {};

            const result = cookieExtractor(req);
            expect(result).toBeNull();
        });
    });
});
