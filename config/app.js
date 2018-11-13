const env = process.env;
const config = {
  app: {
    port: env.APP_PORT,
    name: env.APP_NAME,
    domain: env.APP_HOST,
  },
  database: {
    mongo: {
      host: env.MONGO_HOST,
    },
  },
  email: {},
};

module.exports = config;
