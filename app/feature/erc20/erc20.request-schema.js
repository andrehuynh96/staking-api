const Joi = require("joi");
const CONST = require('./const');


var allPlans = Joi.object().keys({
  status: Joi.string().valid(
      CONST.PLAN_STATUS.all,
      CONST.PLAN_STATUS.active,
      CONST.PLAN_STATUS.deactive
    ).empty('').default(CONST.PLAN_STATUS.all)
})

module.exports = {
  allPlans: allPlans
};