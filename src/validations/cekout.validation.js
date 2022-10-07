const Joi = require('joi');

const ceckoutApi = {
  body: Joi.object().keys({
    product: Joi.string().required(),
    size: Joi.string().required(),
    price: Joi.number().required(),
    email: Joi.string().required(),
    total: Joi.number().required(),
  }),
};

module.exports = {
  ceckoutApi,
};
