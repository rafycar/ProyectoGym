/* schema de validadcion de los datos de nuevo exercise */
const { string } = require("joi");
const Joi = require("joi");

const exerciseSchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(150).required(),
  typology: Joi.string().max(50).required(),
  muscles: Joi.string().max(50).required(),
});

module.exports = exerciseSchema;