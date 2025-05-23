const Joi = require("joi");
const validator = require("../validators");
const { capitalize, lowerCase, camelCase } = require("lodash");

exports.validate = (data, handler) => {
  let schema = `${lowerCase(handler[0].replace("Controller", ""))}Validators`;

  let validationSchema = validator[schema][camelCase(handler[1])];

  const validateData = Joi.validate(data, validationSchema);

  if (validateData.error !== null) throw new Error(validateData.error.message);
};
