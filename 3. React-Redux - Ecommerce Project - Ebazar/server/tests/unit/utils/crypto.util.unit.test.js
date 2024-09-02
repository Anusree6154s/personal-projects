const crypto = require('crypto');
const { hashPassword } = require('../../../src/utils/crypto.util');

describe('hashPassword', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should hash password correctly with default parameters', () => {
        const password = 'testPassword';
        const salt = 'testSalt';
        const expectedHash = Buffer.from('expectedHash', 'hex'); // Use a real expected hash value based on your specific implementation

        // Mocking crypto.pbkdf2Sync
        crypto.pbkdf2Sync = jest.fn().mockReturnValue(expectedHash);

        const hash = hashPassword(password, salt);

        expect(crypto.pbkdf2Sync).toHaveBeenCalledWith(password, salt, 310000, 32, 'sha256');
        expect(hash).toEqual(expectedHash);
    });

    test('should hash password correctly with custom parameters', () => {
        const password = 'testPassword';
        const salt = 'testSalt';
        const iterations = 100000;
        const keylen = 64;
        const digest = 'sha512';
        const expectedHash = Buffer.from('expectedCustomHash', 'hex'); // Use a real expected hash value based on your specific implementation

        // Mocking crypto.pbkdf2Sync
        crypto.pbkdf2Sync = jest.fn().mockReturnValue(expectedHash);

        const hash = hashPassword(password, salt, iterations, keylen, digest);

        expect(crypto.pbkdf2Sync).toHaveBeenCalledWith(password, salt, iterations, keylen, digest);
        expect(hash).toEqual(expectedHash);
    });

    test('should return Buffer from pbkdf2Sync', () => {
        const password = 'testPassword';
        const salt = 'testSalt';
        const expectedHash = Buffer.from('expectedHash', 'hex'); // Use a real expected hash value based on your specific implementation

        // Mocking crypto.pbkdf2Sync
        crypto.pbkdf2Sync = jest.fn().mockReturnValue(expectedHash);

        const hash = hashPassword(password, salt);

        expect(Buffer.isBuffer(hash)).toBe(true);
        expect(hash).toEqual(expectedHash);
    });

    test('should call pbkdf2Sync with correct parameters', () => {
        const password = 'testPassword';
        const salt = 'testSalt';

        // Mocking crypto.pbkdf2Sync
        crypto.pbkdf2Sync = jest.fn().mockReturnValue(Buffer.from('hash', 'hex'));

        hashPassword(password, salt);

        expect(crypto.pbkdf2Sync).toHaveBeenCalledWith(password, salt, 310000, 32, 'sha256');
    });
});
