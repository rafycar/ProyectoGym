const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
  rol: Joi.string().valid('admin','user').required(),
  created: Joi.date(),
});

module.exports = userRegisterSchema;