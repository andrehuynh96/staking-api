
const logger = require("app/lib/logger");
const StakingPlans = require("app/model").staking_plan;
const PLAN_STATUS = require('./const').PLAN_STATUS;

async function getAllPlans(req, res, next) {
    try {
        var status = req.query.status || PLAN_STATUS.all;
        var filter = {order:['created_at']};
        if (status == PLAN_STATUS.active) { 
            filter['where']  = {actived_flg: true}
        } else if (status == PLAN_STATUS.deactive) { 
            filter['where']  = {actived_flg: false}
        }
        filter['attributes'] = ['staking_plan_code', 'duration', 'duration_type', 'reward_per_year', 'actived_flg'];
        var plans = await StakingPlans.findAll(filter, { raw: true })
        res.ok(plans)
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

module.exports = {
    getAllPlans: getAllPlans
}