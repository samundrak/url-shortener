const URLShortener = require('../../core/services/URLShortener');

module.exports = {
  /**
   * Calls service and create new short url of provided long url
   * @param {Object} req
   * @param {Object} res
   */
  async create(req, res) {
    try {
      const url = req.body.url;
      const urlShortener = new URLShortener();
      const oldDocument = await urlShortener.fetchDocumentByUrl(url);
      if (oldDocument) {
        return res.json({
          message: 'New short url created',
          short_url: `${process.env.APP_HOST}/${oldDocument.short_url_id}`,
          original_url: url,
        });
      }
      const savedDocument = await urlShortener.create(url);
      return res.json({
        message: 'New short url created',
        short_url: `${process.env.APP_HOST}/${savedDocument.short_url_id}`,
        original_url: url,
      });
    } catch (err) {
      global.logger.error(err.message);
      return res.boom.badImplementation();
    }
  },
  /**
   * @param {Object} req
   * @param {Object} res
   */
  async open(req, res) {
    try {
      const urlShortener = new URLShortener();
      const urlInfo = await urlShortener.fetchDocumentByUrlId(req.params.shortId);
      return res.redirect(urlInfo.url);
    } catch (err) {
      global.logger.error(err.message);
      return res.boom.badImplementation();
    }
  },
};
