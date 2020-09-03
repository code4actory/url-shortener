require('dotenv').config();
const mongoose = require('mongoose');
const ShortUrl = require('./model/shortUrl');
const urlData = { longUrl: 'http://www.facebook.com', shortUrl: 'fhfhn67', dateCreated: new Date()};

describe('ShortUrl Model Test', () => {

    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
    });

    it('create & save url successfully', async () => {
        const validUrl = new ShortUrl(urlData);
        const savedData = await validUrl.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(validUrl._id).toBeDefined();
        expect(savedData.longUrl).toBe(urlData.longUrl);
        expect(savedData.shortUrl).toBe(urlData.shortUrl);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert short url successfully, but the field that is not defined in schema should be undefined', async () => {
        const dataWithInvalidField = new ShortUrl({ country: 'US', longUrl:'http://www.facebook.com', shortUrl: 'fhfhn67', creationDate: new Date() });
        const savedDataWithInvalidField = await dataWithInvalidField.save();
        expect(savedDataWithInvalidField._id).toBeDefined();
        expect(savedDataWithInvalidField.creationDate).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should tell us the errors is on longUrl and shortUrl field.
    it('create url without required field should failed', async () => {
        const dataWithoutRequiredField = new ShortUrl({ description: 'beautiful url', dateCreated: new Date() });
        let err;
        try {
            const savedUrlWithoutRequiredField = await dataWithoutRequiredField.save();
            error = savedUrlWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.longUrl).toBeDefined();
        expect(err.errors.shortUrl).toBeDefined();

    });

    
})