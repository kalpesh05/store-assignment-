const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.register = Joi.object().keys({
  email: Joi.string()
    .min(3)
    .max(100)
    .email()
    .error(new Error(errorMessages.EMAIL))
    .required(),
  user_name: Joi.string()
    .min(3)
    .max(15)
    .error(new Error(errorMessages.USER_NAME))
    .required(),
  password: Joi.string()
    .min(8)
    .error(new Error(errorMessages.PASSWORD))
    .required(),
  gender: Joi.string()
    .error(new Error(errorMessages.GENDER))
    .optional(),
  mobile_no: Joi.string()
    .error(new Error(errorMessages.MOBILE_NO))
    .optional(),
  role_id: Joi.string()
    .error(new Error(errorMessages.ROLE))
    .optional()
});

exports.login = Joi.object().keys({
  email: Joi.string()
    .min(3)
    .max(100)
    .email()
    .error(new Error(errorMessages.EMAIL))
    .required(),
  password: Joi.string()
    .min(8)
    .error(new Error(errorMessages.PASSWORD))
    .required(),
  role: Joi.string()
    .error(new Error(errorMessages.ROLE))
    .optional()
});

exports.forgotPassword = Joi.object().keys({
  email: Joi.string()
    .min(3)
    .max(100)
    .email()
    .error(new Error(errorMessages.EMAIL))
    .required()
});

exports.resetPassword = Joi.object().keys({
  token: Joi.string()
    .error(new Error(errorMessages.INVALID_TOKEN))
    .required(),
  new_password: Joi.string()
    .min(8)
    .error(new Error(errorMessages.NEW_PASSWORD))
    .required()
});

exports.resendVerifyEmail = Joi.object().keys({
  email: Joi.string()
    .min(3)
    .max(100)
    .email()
    .error(new Error(errorMessages.EMAIL))
    .required()
});
