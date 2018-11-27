/* eslint-disable no-console, no-param-reassign */
/* global require, global */
require('dotenv').config();
const express = require('express');
const path = require('path');
const appConfig = require('./../../config/app');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const Logger = require('./services/Logger');
const boom = require('express-boom');
const rateLimit = require('express-rate-limit');
const Promise = require('bluebird');
const helper = require('./utils/helper');
const winstonLogsDisplay = require('winston-logs-display');
const next = require('next');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.join(__dirname, '../../src') });
const handle = nextApp.getRequestHandler();
const apiLimiter = rateLimit({
  windowMs: process.env.API_RATE_LIMIT_WINDOW_IN_MILLISECONDS,
  max: process.env.API_RATE_LIMIT_MAX_NUMBER,
});
// app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
nextApp
  .prepare({ dir: path.join(__dirname, '../../') })
  .then(() => {
    const app = express();
    app.set('env', process.env.NODE_ENV);
    global.config = () => appConfig;
    global.events = new events.EventEmitter();
    global.helper = helper;
    global.Promsie = Promise;
    global.logger = new Logger().setEnv(app.get('env')).get();
    global.app = app;
    global.db = require('./database/mongo'); // eslint-disable-line
    let routes = require('./routes'); // eslint-disable-line
    const apiRoutes = require('./routes/api'); // eslint-disable-line

    routes = routes(app);
    const port = appConfig.app.port;

    app.use(helmet());
    app.use(cors());
    app.use(boom());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../public')));

    if (process.env.NODE_ENV !== 'production') {
      winstonLogsDisplay(app, global.logger);
    }

    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    app.use('/api', apiLimiter, apiRoutes);
    app.use('/', routes);
    app.get('*', (req, res) => handle(req, res));

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    app.use((err, req, res, next) => {
      if (app.get('env') === 'development') {
        if (req.path.indexOf('api') > -1) {
          return res.status(err.status || 500).json({
            message: err.message,
            error: err,
          });
        }
        return res.status(err.status || 500).render('error', {
          message: err.message,
          error: err,
        });
      }
      if (req.path.indexOf('api') > -1) {
        return res.status(err.status || 500).json({
          message: err.message,
          error: err,
        });
      }
      return res.status(err.status || 500).render('error', {
        message: 'Some Error Occurred',
        error: '',
      });
    });

    app.listen(port, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Server is running on http://localhost:${port}`);
      }
    });
  })
  .catch((ex) => {
    global.logger.error(ex);
    process.exit(1);
  });

// // NOTE: event name is camelCase as per node convention
process.on('unhandledRejection', (reason, promise) => {
  // See Promise.onPossiblyUnhandledRejection for parameter documentation
  global.logger.error(reason);
});

// Will shut down app if any uncaught exception occurs
process.on('uncaughtException', (err) => {
  global.logger.error(err);
  process.exit(1);
});
