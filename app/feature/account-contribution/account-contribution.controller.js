const logger = require("app/lib/logger");
const config = require("app/config");
const accountContributionMapper = require("app/feature/response-schema/account-contribution.response-schema");
const CosmosAccountContribution = require("app/model").cosmos_account_contributions;
const IrisAccountContribution = require("app/model").iris_account_contributions;
const ONTStakingContribute = require("app/model").ont_staking_contributions;
const TransactionStatus = require("app/model/value-object/transaction-status")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  get: async (req, res, next) => {
    try {
      let symbol = req.params.symbol;
      let offset = req.query.offset ? parseInt(req.query.offset) : 0;
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      if (!symbol)
        return res.ok()
      switch (symbol.toLowerCase()) {
        case 'atom':
          const { count: total, rows: items } = await CosmosAccountContribution.findAndCountAll(
            {
              limit,
              offset,
              where: {
                status: TransactionStatus.CONFIRMED,
                calculate_reward: {
                  [Op.or]: [false, null]
                }
              },
              order: [['block_from', 'ASC']]
            })
          return res.ok({
            items: items && items.length > 0 ? accountContributionMapper(items) : [],
            offset: offset,
            limit: limit,
            total: total
          });
        case 'iris':
          const { count: totalIris, rows: itemsIris } = await IrisAccountContribution.findAndCountAll(
            {
              limit,
              offset,
              where: {
                status: TransactionStatus.CONFIRMED,
                calculate_reward: {
                  [Op.or]: [false, null]
                }
              },
              order: [['block_from', 'ASC']]
            })
          return res.ok({
            items: itemsIris && itemsIris.length > 0 ? accountContributionMapper(itemsIris) : [],
            offset: offset,
            limit: limit,
            total: totalIris
          });
        case 'ont':
          const { count: totalOnt, rows: itemsOnt } = await ONTStakingContribute.findAndCountAll(
            {
              limit,
              offset,
              where: {
                status: TransactionStatus.CONFIRMED,
                calculate_reward: {
                  [Op.or]: [false, null]
                }
              },
              order: [['block_from', 'ASC']]
            })
          return res.ok({
            items: itemsOnt && itemsOnt.length > 0 ? accountContributionMapper(itemsOnt) : [],
            offset: offset,
            limit: limit,
            total: totalOnt
          });
        default:
          return res.ok({
            items: [],
            offset: 0,
            limit: 10,
            total: 0
          });
      }
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
      if (!ids || ids.length < 1)
        return res.ok(false);
      switch (symbol.toLowerCase()) {
        case 'atom':
          await CosmosAccountContribution.update({
            calculate_reward: true,
            affiliate_reward_id: req.body.affiliate_reward_id
          }, {
            where: {
              id: {
                [Op.in]: ids
              }
            }
          })
          return res.ok(true);
        case 'iris':
          await IrisAccountContribution.update({
            calculate_reward: true,
            affiliate_reward_id: req.body.affiliate_reward_id
          }, {
            where: {
              id: {
                [Op.in]: ids
              }
            }
          })
          return res.ok(true);
        case 'ont':
          await ONTStakingContribute.update({
            calculate_reward: true,
            affiliate_reward_id: req.body.affiliate_reward_id
          }, {
            where: {
              id: {
                [Op.in]: ids
              }
            }
          })
          return res.ok(true);
        default:
          return res.ok(false);
      }
    }
    catch (err) {
      logger.error("set account contribution fail:", err);
      next(err);
    }
  }
}