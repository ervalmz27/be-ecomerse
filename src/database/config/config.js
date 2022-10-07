const config = require('../../config/config');

module.exports = {
  development: {
    url: config.postgreSql.dev,
    dialect: 'postgres',
  },
  test: {
    url: config.postgreSql.test,
    dialect: 'postgres',
  },
  production: {
    url: config.postgreSql.prod,
    dialect: 'postgres',
  },
};
