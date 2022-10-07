const { Sequelize } = require('sequelize');
const config = require('../../config/config');
const url = require('./config');

let URI;

if (config.env === 'development') {
  URI = url.development.url;
} else if (config.env === 'test') {
  URI = url.development.url;
} else if (config.env === 'production') {
  URI = url.production.url;
}

const db = new Sequelize(URI);
module.exports = db;
