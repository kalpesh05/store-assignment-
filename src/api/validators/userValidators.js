const Joi = require("joi");
const errorMessages = require("../constants/errorMessages");

exports.updateProfile = Joi.object().keys({
  first_name: Joi.string()
    .min(3)
    .max(15)
    .error(new Error(errorMessages.FIRST_NAME))
    .optional(),
  last_name: Joi.string()
    .min(1)
    .max(15)
    .error(new Error(errorMessages.LAST_NAME))
    .optional(),
  password: Joi.string()
    .min(8)
    .error(new Error(errorMessages.PASSWORD))
    .optional(),
  gender: Joi.string()
    .error(new Error(errorMessages.GENDER))
    .optional(),
  mobile_no: Joi.string()
    .error(new Error(errorMessages.MOBILE_NO))
    .optional(),
  role_id: Joi.string()
    .error(new Error(errorMessages.ROLE))
    .optional(),
  avatar_image_url: Joi.string()
    .error(new Error(errorMessages.PROFILE_IMAGE_URL))
    .optional()
});

exports.extraFieldCreate = Joi.object().keys({
  heading: Joi.string()
    .error(new Error(errorMessages.USER_EXTRA_FIELD_HEADING))
    .required(),
  body: Joi.string()
    .error(new Error(errorMessages.USER_EXTRA_FIELD_BODY))
    .required(),
  index: Joi.number()
    .error(new Error(errorMessages.USER_EXTRA_FIELD_INDEX))
    .required()
});

exports.extraFieldUpdate = Joi.object().keys({
  heading: Joi.string().error(new Error(errorMessages.USER_EXTRA_FIELD_HEADING)),
  body: Joi.string().error(new Error(errorMessages.USER_EXTRA_FIELD_BODY)),
  index: Joi.number().error(new Error(errorMessages.USER_EXTRA_FIELD_INDEX))
});
