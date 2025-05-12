const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .error(new Error(errorMessages.PRODUCT_NAME)),
  description: Joi.string()
    .allow('')
    .max(500)
    .error(new Error(errorMessages.PRODUCT_DESCRIPTION)),
  price: Joi.number()
    .positive()
    .required()
    .error(new Error(errorMessages.PRODUCT_PRICE)),
  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .error(new Error(errorMessages.PRODUCT_STOCK)),
  category_id: Joi.string()
    .required()
    .error(new Error(errorMessages.CATEGORY_ID)),
  image_url: Joi.string()
    .uri()
    .optional()
    .error(new Error(errorMessages.PRODUCT_IMAGE_URL))
});

exports.update = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .error(new Error(errorMessages.PRODUCT_NAME)),
  description: Joi.string()
    .allow('')
    .max(500)
    .optional()
    .error(new Error(errorMessages.PRODUCT_DESCRIPTION)),
  price: Joi.number()
    .positive()
    .optional()
    .error(new Error(errorMessages.PRODUCT_PRICE)),
  stock: Joi.number()
    .integer()
    .min(0)
    .optional()
    .error(new Error(errorMessages.PRODUCT_STOCK)),
  category_id: Joi.string()
    .optional()
    .error(new Error(errorMessages.CATEGORY_ID)),
  image_url: Joi.string()
    .uri()
    .optional()
    .error(new Error(errorMessages.PRODUCT_IMAGE_URL))
});
