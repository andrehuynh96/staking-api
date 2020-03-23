const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    partner_id: Joi.string().required()
});

module.exports = schema;