const httpStatus = require('http-status');
const db = require('../database/models');
const ApiError = require('../utils/ApiError');
const Cheakout = db.checkouts;
const ceckoutApi = async (data) => {
  try {
    const apis = await Cheakout.create({
      product: data.product,
      email: data.email,
      size: data.size,
      price: data.price,
      total: data.total,
    });
    return {
      message: 'Ceckout Success',
      data: apis,
    };
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
  }
};
module.exports = {
  ceckoutApi,
};
