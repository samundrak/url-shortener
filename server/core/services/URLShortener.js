/**
 * This service helps creating short url, find short url
 */
const shortId = require('shortid');
const URLShortenerRepository = require('../repositories/URLShortenerRepository');

class URLShortener {
  async create(url, aliasForShortUrl = null) {
    const shortUrlId = aliasForShortUrl || shortId.generate();
    const document = {
      url,
      short_url_id: shortUrlId,
    };
    const savedDocument = await URLShortenerRepository.create(document);
    return savedDocument;
  }

  /**
   * Finds document of shorten url by id
   * @param {String} shortUrlId url id
   */
  async fetchDocumentByUrlId(shortUrlId) {
    return await URLShortenerRepository.fetch({ short_url_id: shortUrlId }); // eslint-disable-line
  }
  /**
   * Finds document of shortern url by url
   * @param {String} url fully verified url
   */
  async fetchDocumentByUrl(url) {
    return await URLShortenerRepository.fetch({ url }); // eslint-disable-line
  }
}

module.exports = URLShortener;
