const httpStatus = require('http-status');
const db = require('../database/models');
const ApiError = require('../utils/ApiError');

const Op = db.Sequelize.Op;

const Products = db.product;

const createApi = async (data, image) => {
  try {
    const meta_apis = await Products.create({
      name: data.name,
      size: data.size,
      price: data.price,
      image: image,
    });
    // console.log(meta_apis);
    return {
      message: 'Create product Success',
      data: meta_apis,
    };
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
  }
};

/**
 * Query for templates
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryApis = async (filter, options = { limit: 10, page: 1 }) => {
  try {
    const where = {};
    if (filter?.search) {
      where.name = {
        [Op.iLike]: `%${filter.search}%`,
      };
    }
    const meta_apis = await Products.findAndCountAll({
      limit: options.limit,
      offset: (options.page - 1) * options.limit,
      where,
      order: [['createdAt', 'DESC']],
    });
    meta_apis.rows = meta_apis.rows.map((record) => record.toJSON());
    return meta_apis;
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
  }
};

const getApiById = async (id) => {
  try {
    const meta_apis = await Products.findByPk(id);
    return {
      message: 'Success Get Api',
      data: meta_apis.toJSON(),
    };
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Api Not Found');
  }
};

module.exports = {
  createApi,
  queryApis,
  getApiById,
};
