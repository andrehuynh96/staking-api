
const logger = require("app/lib/logger");
const PLAN_STATUS = require('../const').PLAN_STATUS;
const StakingPlans = require("app/model").staking_plan;

async function getAllPlans(req, res, next) {
    try {
        var status = req.query.status || PLAN_STATUS.all;
        var staking_platform_id = req.query.staking_platform_id;
        var include_deleted = req.query.include_deleted;

        var filter = { order: ['created_at'] };
        var where = {};

        if (status == PLAN_STATUS.active) {
            where['actived_flg'] = true;
        } else if (status == PLAN_STATUS.deactive) {
            where['actived_flg'] = false;
        }

        if (staking_platform_id) {
            where['staking_platform_id'] = staking_platform_id;
        }

        if (!include_deleted) {
            where['deleted_flg'] = false;
        }

        filter['where'] = where;
        filter['attributes'] = [
            "id",
            "staking_plan_code",
            "duration",
            "duration_type",
            "reward_per_year",
            "actived_flg",
            "reward_in_diff_platform_flg",
            "reward_platform",
            "reward_token_address",
            "staking_platform_id",
            "deleted_flg"
        ];

        var plans = await StakingPlans.findAll(filter, { raw: true })
        res.ok(plans)
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

async function insertPlan(req, res, next) {
    throw "NOT IMPLEMENT"
}
async function updatePlan(req, res, next) {
    throw "NOT IMPLEMENT"
}
module.exports = {
    getAllPlans: getAllPlans,
    insertPlan: insertPlan,
    updatePlan: updatePlan
}