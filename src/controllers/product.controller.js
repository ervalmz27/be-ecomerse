const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createApi = catchAsync(async (req, res) => {
  if (!req.file) {
    const err = new ApiError(httpStatus.NOT_FOUND, 'Image not found');
    throw err;
  }
  const result = await productService.createApi(req.body, req.file.path);
  res.status(httpStatus.CREATED).send(result);
});

const getApi = catchAsync(async (req, res) => {
  const result = await productService.getApiById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const data = {
    message: 'Success Get List Product',
    data: result,
  };
  res.send(data);
});

const getApis = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['search']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryApis(filter, options);
  const data = {
    message: 'Success Get List Domain Type',
    data: result,
  };
  res.send(data);
});

module.exports = {
  createApi,
  getApi,
  getApis,
};
