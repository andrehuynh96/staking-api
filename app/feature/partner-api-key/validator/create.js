const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    partner_id: Joi.string().required(),
    user_id: Joi.number().required()
});

module.exports = schema;