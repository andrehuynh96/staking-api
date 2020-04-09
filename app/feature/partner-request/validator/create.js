const Joi = require('joi');

const schema = Joi.object().keys({
  reward_address: Joi.string().required(),
  link: Joi.string().required(),
  email_confirmed: Joi.string().required()
});

module.exports = schema;