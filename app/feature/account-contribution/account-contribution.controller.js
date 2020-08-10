const logger = require("app/lib/logger");
const accountContributionMapper = require("app/feature/response-schema/account-contribution.response-schema");
const CosmosAccountContribution = require("app/model").cosmos_account_contributions;
const IrisAccountContribution = require("app/model").iris_account_contributions;
const HarmonyStakingContribution = require("app/model").harmony_staking_contributions;
const ONTStakingContribute = require("app/model").ont_staking_contributions;
const TezosAccountContribute = require("app/model").tezos_account_contributions;
const TransactionStatus = require("app/model/value-object/transaction-status")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Model = { 'one': HarmonyStakingContribution, 'atom': CosmosAccountContribution, 'iris': IrisAccountContribution, 'ong': ONTStakingContribute, 'xtz': TezosAccountContribute };

module.exports = {
  get: async (req, res, next) => {
    try {
      let symbol = req.params.symbol;
      let offset = req.query.offset ? parseInt(req.query.offset) : 0;
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      if (!symbol)
        return res.ok()
      const { count: total, rows: items } = await _getContributions(Model[symbol.toLowerCase()], offset, limit);
      return res.ok({
        items: items && items.length > 0 ? accountContributionMapper(items) : [],
        offset: offset,
        limit: limit,
        total: total
      })
    }
    catch (err) {
      logger.error("get account contribution fail:", err);
      next(err);
    }
  },
  set: async (req, res, next) => {
    try {
      let symbol = req.params.symbol;
      let ids = req.body.ids;
      console.log(Model);
      if (!ids || ids.length < 1)
        return res.ok(false);
      if (!Model[symbol.toLowerCase()])
        return res.ok(false);
      await _updatedContributions(Model[symbol.toLowerCase()], ids, req.body.affiliate_reward_id);
      return res.ok(true);
    }
    catch (err) {
      logger.error("set account contribution fail:", err);
      next(err);
    }
  }
}

async function _getContributions(Model, offset, limit) {
  if (!Model)
    return { count: 0, rows: [] };
  const { count: total, rows: items } = await Model.findAndCountAll(
    {
      limit,
      offset,
      where: {
        status: TransactionStatus.CONFIRMED,
        calculate_reward: {
          [Op.or]: [false, null]
        }
      },
      order: [['created_at', 'ASC']]
    });

  return { count: total, rows: items };
}

async function _updatedContributions(Model, ids, affiliate_reward_id) {
  await Model.update({
    calculate_reward: true,
    affiliate_reward_id: affiliate_reward_id
  }, {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
}