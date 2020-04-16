const Joi = require('joi');

const schema = Joi.object().keys({
  items: Joi.array().required().items(
    Joi.object().keys({
      id: Joi.string().optional(),
      platform: Joi.string().required(),
      commission: Joi.number().min(0.000).max(100).required()
    })
  ),
  updated_by: Joi.number().required()
});

module.exports = schema;