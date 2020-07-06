const Joi = require("joi");
const config = require("app/config");

const schema = Joi.object().keys({
  ids: Joi.array().items(Joi.string())
})

module.exports = schema;