const ApiError = require('./ApiError');

const handleError = async (status, message) => {
  throw new ApiError(status, message);
};

module.exports = {
  handleError,
};
