const api = require('express').Router();
const requestValidator = require('../../middlewares/requestValidator');
const urlRequestSchema = require('../../rules/request/URLSchema');
const URLShortenerController = require('../../controllers/URLShortenerController');

api.post('/url/create', requestValidator(urlRequestSchema).body, URLShortenerController.create);

module.exports = api;
