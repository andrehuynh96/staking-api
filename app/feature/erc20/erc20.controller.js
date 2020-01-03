
const logger = require("app/lib/logger");
const PLAN_STATUS = require('./const').PLAN_STATUS;
const StakingPlans = require("app/model").staking_plan;
const Deposits = require("app/model").deposit;
const Withdraws = require("app/model").withdraw;
const db = require('./db');

async function getAllPlans(req, res, next) {
    try {
        var status = req.query.status || PLAN_STATUS.all;
        var filter = { order: ['created_at'] };
        if (status == PLAN_STATUS.active) {
            filter['where'] = { actived_flg: true }
        } else if (status == PLAN_STATUS.deactive) {
            filter['where'] = { actived_flg: false }
        }
        filter['attributes'] = ['staking_plan_code', 'duration', 'duration_type', 'reward_per_year', 'actived_flg'];
        var plans = await StakingPlans.findAll(filter, { raw: true })
        res.ok(plans)
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

async function getDepositById(req, res, next) {
    var id = req.params.id;

    try {
        var deposit = await Deposits.findOne({
            where: { deposit_id: id },
            attributes: [
                "block_number",
                "block_hash",
                "transaction_index",
                "log_index",
                "deposit_id",
                "token_addr",
                "depositor_addr",
                "amount",
                "duration",
                "memo"
            ],
            raw: true
        });
        if (deposit) {
            var withdraw = await Withdraws.findOne({
                where: { deposit_id: id },
                attributes: [
                    "block_number",
                    "block_hash",
                    "transaction_index",
                    "deposit_id",
                    "token_addr",
                    "depositor_addr",
                    "amount",
                    "recipient_addr"
                ],
                raw: true
            });
            deposit.withdraw = withdraw;
        }
        res.ok(deposit);
    } catch (err) {
        next(err);
    }
}


async function getDepositByDepositor(req, res, next) {
    var address = req.params.address;
    var offset = req.params.offset;
    var limit = req.params.limit;
    //TODO: Check ETH address
    try {
        var deposit = await db.getDepositByDepositorAddr(address, offset, limit);
        res.ok(deposit);
    } catch (err) {
        next(err);
    }
}



module.exports = {
    getAllPlans: getAllPlans,
    getDepositById: getDepositById,
    getDepositByDepositor:getDepositByDepositor
}