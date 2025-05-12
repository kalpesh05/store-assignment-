const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.create = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .error(new Error(errorMessages.CATEGORY_NAME)),
  description: Joi.string()
    .allow('')
    .max(300)
    .optional()
    .error(new Error(errorMessages.CATEGORY_DESCRIPTION))
});

exports.update = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .error(new Error(errorMessages.CATEGORY_NAME)),
  description: Joi.string()
    .allow('')
    .max(300)
    .optional()
    .error(new Error(errorMessages.CATEGORY_DESCRIPTION))
});
