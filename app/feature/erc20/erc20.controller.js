
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

async function getDeposit(req, res, next) {
    var depositor_address = req.query.depositor_address;
    var deposit_id = req.query.deposit_id;
    var token_address = req.query.token_address;
    var memo = req.query.memo;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var where = ''
    if (depositor_address) {
        where += ` AND d.depositor_addr = '${depositor_address}'`;
    }
    if (token_address) {
        where += ` AND d.token_addr = '${token_address}'`;
    }
    if (deposit_id >= 0) {
        where += ` AND d.deposit_id = ${deposit_id}`;
    }
    if (memo) {
        where += ` AND d.memo = '${memo}'`;
    }

    try {
        var deposit = await db.getDeposit(where, offset, limit);
        res.ok(deposit);
    } catch (err) {
        next(err);
    }
}

async function getHistoryOfAddress(req, res, next) {
    var depositor_address = req.query.depositor_address;
    var token_address = req.query.token_address;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var where = '1=1'
    if (depositor_address) {
        where += ` AND depositor_addr = '${depositor_address}'`;
    }
    if (token_address) {
        where += ` AND token_addr = '${token_address}'`;
    }

    try {
        var history = await db.getHistoryOfAddress(where, offset, limit);
        res.ok(history);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAllPlans: getAllPlans,
    getDeposit: getDeposit,
    getHistoryOfAddress: getHistoryOfAddress
}