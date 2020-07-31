const Joi = require("joi");
const config = require("app/config");

const schema = Joi.object().keys({
  ids: Joi.array().items(Joi.string()),
  affiliate_reward_id: Joi.string().required(),
})

module.exports = schema;