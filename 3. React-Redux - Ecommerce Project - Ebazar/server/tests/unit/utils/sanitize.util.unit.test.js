const { sanitizeUser } = require('../../../src/utils/sanitize.util');

describe('sanitizeUser', () => {
    test('should return a sanitized user object with expected properties', () => {
        // Example input user object
        const user = {
            id: 'user123',
            email: 'user@example.com',
            role: 'admin',
            addresses: ['123 Main St', '456 Oak Ave'],
            address: '123 Main St',
            orders: ['order1', 'order2'],
            name: 'John Doe',
            phone: '555-1234',
            image: 'profile.jpg',
            extraProperty: 'extraValue' // This should not be included in the output
        };

        // Expected sanitized output
        const expectedSanitizedUser = {
            id: 'user123',
            email: 'user@example.com',
            role: 'admin',
            addresses: ['123 Main St', '456 Oak Ave'],
            address: '123 Main St',
            orders: ['order1', 'order2'],
            name: 'John Doe',
            phone: '555-1234',
            image: 'profile.jpg'
        };

        // Call the sanitizeUser function
        const result = sanitizeUser(user);
        // Assertions
        expect(result).toEqual(expectedSanitizedUser);
    });

    test('should handle missing properties in the user object', () => {
        // Example user object with some properties missing
        const user = {
            id: 'user123',
            email: 'user@example.com',
            role: 'admin',
        };

        // Expected sanitized output with missing properties handled
        const expectedSanitizedUser = {
            id: 'user123',
            email: 'user@example.com',
            role: 'admin',
            addresses: undefined,
            address: undefined,
            orders: undefined,
            name: undefined,
            phone: undefined,
            image: undefined
        };

        // Call the sanitizeUser function
        const result = sanitizeUser(user);

        // Assertions
        expect(result).toEqual(expectedSanitizedUser);
    });
});
