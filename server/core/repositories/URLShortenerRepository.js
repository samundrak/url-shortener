const URLShortenerModel = require('../model/URL');

class URLShortenerRepository {
  /**
   * Creates new document of url
   * @param {Object} urlObject
   */
  static async create(urlObject) {
    const URLShortener = new URLShortenerModel();
    URLShortener.url = urlObject.url;
    URLShortener.short_url_id = urlObject.short_url_id;
    const document = await URLShortener.save();
    return document;
  }

  /**
   * fetches documents from collection using provided clauses
   * @param {Object} clause
   */
  static async fetch(clause) {
    console.log(clause);
    return await URLShortenerModel.findOne({ ...clause }); // eslint-disable-line
  }
}
module.exports = URLShortenerRepository;
