const Joi = require("joi");
const CONST = require('./const');
const web3Util = require('web3-utils');

const Address = Joi.extend((joi) => {
  return {
    name: 'ETHAddress',
    base: Joi.string(),
    language: {
      'checksum': 'is not an address',
    },
    rules: [
      {
        name: 'checksum',
        setup(params) {
          console.log("Setup");
          this._flags.checksum = true
        },
        validate(params, value, state, options) {
          console.log("Run validate");
          if (!web3Util.isAddress(value)) {
            return this.createError('ETHAddress.checksum', { v: value }, state, options);
          }
          return value;
          return web3Util.toChecksumAddress(value);
        }
      }
    ]

  }
})

var allPlans = Joi.object().keys({
  status: Joi.string().valid(
    CONST.PLAN_STATUS.all,
    CONST.PLAN_STATUS.active,
    CONST.PLAN_STATUS.deactive
  ).empty('').default(CONST.PLAN_STATUS.all)
})

var checkGetDeposit = Joi.object({
  depositor_address: Address.ETHAddress().empty('').allow('').checksum(),
  token_address: Address.ETHAddress().empty('').allow('').checksum(),
  deposit_id: Joi.number().integer().allow(''),
  memo: Joi.string().allow('').max(8),
  offset: Joi.number().integer().min(0).empty('').default(0),
  limit: Joi.number().integer().min(0).max(50).empty('').default(50),
});

module.exports = {
  allPlans: allPlans,
  checkGetDeposit: checkGetDeposit
};