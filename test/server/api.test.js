/* global expect */
require('dotenv').config();
const axios = require('axios');

const host = process.env.APP_HOST;
describe('Testing API', () => {
  it('should return error if provided invalid url', (done) => {
    axios
      .post(`${host}/api/url/create`, { url: 'invalid url' })
      .then(() => {
        done(new Error());
      })
      .catch((err) => {
        expect(err.response.data.statusCode).toBe(422);
        done();
      });
  });

  it('should create new short url from provided url', (done) => {
    axios
      .post(`${host}/api/url/create`, { url: 'https://www.google.com' })
      .then((response) => {
        expect(response.data).toHaveProperty('short_url');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
