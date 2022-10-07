const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const url = require('../config/config');

const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require('../../config/config');

const db = {};

let sequelize;

if (config.env === 'development') {
  sequelize = new Sequelize(url.development.url);
} else if (config.env === 'test') {
  sequelize = new Sequelize(url.development.url);
} else if (config.env === 'production') {
  sequelize = new Sequelize(url.production.url);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
