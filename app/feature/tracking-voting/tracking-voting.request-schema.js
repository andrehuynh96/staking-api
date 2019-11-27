const Joi = require("joi");
const config = require("app/config");

const schema = Joi.object().keys({
  tx_id: Joi.string().required(),
  platform: Joi.string().required().valid(config.platform).insensitive().uppercase()
})

module.exports = schema;