const Joi = require("joi");
const CONST = require('../const');
const web3Util = require('web3-utils');

var allPlans = Joi.object().keys({
  status: Joi.string().valid(
    CONST.PLAN_STATUS.all,
    CONST.PLAN_STATUS.active,
    CONST.PLAN_STATUS.deactive
  ).empty('').default(CONST.PLAN_STATUS.all),
  staking_platform_id: Joi.string().allow('').uuid(),
  include_deleted: Joi.bool().default(false).allow('')
})


module.exports = {
  allPlans: allPlans
};
