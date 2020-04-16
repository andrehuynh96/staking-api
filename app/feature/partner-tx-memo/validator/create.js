const Joi = require('joi');

const schema = Joi.object().keys({
  items: Joi.array().required().items(
    Joi.object().keys({
      platform: Joi.string().required(),
      memo: Joi.string().required()
    })
  ),
  user_id: Joi.number().required()
});

module.exports = schema;