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

  async fetchDocumentByUrlId(shortUrlId) {
    return await URLShortenerRepository.fetch({ short_url_id: shortUrlId }); // eslint-disable-line
  }
  async fetchDocumentByUrl(url) {
    return await URLShortenerRepository.fetch({ url }); // eslint-disable-line
  }
}

module.exports = URLShortener;
