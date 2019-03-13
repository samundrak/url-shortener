const env = process.env;

process.env.PORT = process.env.$PORT;
process.env.APP_HOST = `http://localhost:${env.PORT}`;
const config = {
  app: {
    port: env.PORT,
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
