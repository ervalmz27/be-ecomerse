const express = require('express');
const productValidation = require('../../validations/product.validation');
const checkoutValidation = require('../../validations/cekout.validation');
const productController = require('../../controllers/product.controller');
const cekoutController = require('../../controllers/checkout.controller');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.post('/', validate(productValidation.createApi), productController.createApi);
router.post('/checkout', validate(checkoutValidation.ceckoutApi), cekoutController.ceckoutApi);
router.get('/', validate(productValidation.getApis), productController.getApis);
router.get('/:id', validate(productValidation.getApi), productController.getApi);

module.exports = router;
