const Joi = require("joi");

exports.contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required(),
});
