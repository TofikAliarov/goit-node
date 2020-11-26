const Joi = require("joi");

exports.contactSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: {
    type: Joi.string(),
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: Joi.string(),
});
