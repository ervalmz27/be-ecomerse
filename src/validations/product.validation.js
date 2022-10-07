const Joi = require('joi');

const createApi = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    size: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.any(),
  }),
};

const getApis = {
  query: Joi.object().keys({
    search: Joi.string(),
    sortBy: Joi.string(),
    row: Joi.number(),
    limit: Joi.number().integer().default(5),
    page: Joi.number().integer().default(1),
  }),
};

const getApi = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createApi,
  getApis,
  getApi,
};
