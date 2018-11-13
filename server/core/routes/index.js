const express = require('express');
const viewsRoutes = require('./views');
const URLShortenerController = require('../controllers/URLShortenerController');

const router = express.Router();

module.exports = () => {
  router.get('/:shortId', URLShortenerController.open);
  viewsRoutes(router);
  return router;
};
