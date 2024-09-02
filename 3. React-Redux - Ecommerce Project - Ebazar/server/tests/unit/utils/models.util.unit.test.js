const mongoose = require('mongoose');
const { createVirtualID } = require('../../../src/utils/models.util');

describe('createVirtualID', () => {
    let schema;

    beforeEach(() => {
        // Reset the schema before each test
        schema = new mongoose.Schema({});
        createVirtualID(schema);
    });

    afterEach(() => {
        if (mongoose.models.TestModel) {
            delete mongoose.models.TestModel;
        }
        jest.resetAllMocks()
    })

    test('should add a virtual id property to the schema', () => {
        const Model = mongoose.model('TestModel', schema);

        // Create an instance of the model
        const doc = new Model({ _id: '605c72ef4f7d4e2b8a6b7a8a' });

        // Check that the virtual id is accessible
        expect(doc.id).toBe('605c72ef4f7d4e2b8a6b7a8a');
    });

    test('should include virtual id in JSON output and exclude _id', () => {
        const Model = mongoose.model('TestModel', schema);

        // Create an instance of the model
        const doc = new Model({ _id: '605c72ef4f7d4e2b8a6b7a8a' });

        // Convert the document to JSON
        const json = doc.toJSON();

        // Check that _id is not in the JSON output
        expect(json).not.toHaveProperty('_id');

        // Check that id is included in the JSON output
        expect(json).toHaveProperty('id', '605c72ef4f7d4e2b8a6b7a8a');
    });

    test('should not include versionKey in JSON output', () => {
        // Add versionKey to schema
        schema.set('versionKey', 'version');
        createVirtualID(schema);

        const Model = mongoose.model('TestModel', schema);

        // Create an instance of the model
        const doc = new Model({ _id: '605c72ef4f7d4e2b8a6b7a8a' });

        // Convert the document to JSON
        const json = doc.toJSON();

        // Check that versionKey is not in the JSON output
        expect(json).not.toHaveProperty('version');
    });

    test('should correctly transform the document in JSON output', () => {
        const Model = mongoose.model('TestModel', schema);

        // Create an instance of the model
        const doc = new Model({ _id: '605c72ef4f7d4e2b8a6b7a8a' });

        // Convert the document to JSON
        const json = doc.toJSON();

        // Check that _id has been removed and id is present
        expect(json).toEqual({ id: '605c72ef4f7d4e2b8a6b7a8a' });
    });
});
