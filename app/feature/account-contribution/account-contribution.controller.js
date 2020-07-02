const logger = require("app/lib/logger");
const config = require("app/config");
const accountContributionMapper = require("app/feature/respone-schema/account-contribution.response-schema");
const CosmosAccountContribution = require("app/model").cosmos_account_contributions;
const IrisAccountContribution = require("app/model/staking").iris_account_contributions;
const ONTStakingContribute = require("app/model/staking").ont_staking_contributions;
const TransactionStatus = require("app/model/value-object/transaction-status")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  get: async (req, res, next) => {
    try {
      let symbol = req.params.symbol
      let offset = req.query.offset || 0
      let limit = req.query.limit || 10
      if(!symbol)
        return res.ok()
      switch(symbol.toLowerCase()){
        case 'cosmos':
          const { count: total, rows: items } = await CosmosAccountContribution.findAndCountAll(
          {
            limit,
            offset,
            where:{
              status: TransactionStatus.CONFIRMED,
              calculate_reward: false
            },
            order: [['block_from', 'ASC']]
          })
          return res.ok({
            items: accountContributionMapper(items) && items.length > 0 ? accountContributionMapper(items) : [],
            offset: offset,
            limit: limit,
            total: total
          });  
        case 'iris':
          const { count: total, rows: items } = await IrisAccountContribution.findAndCountAll(
          {
            limit,
            offset,
            where:{
              status: TransactionStatus.CONFIRMED,
              calculate_reward: false
            },
            order: [['block_from', 'ASC']]
          })
          return res.ok({
            items: accountContributionMapper(items) && items.length > 0 ? accountContributionMapper(items) : [],
            offset: offset,
            limit: limit,
            total: total
          });  
        case 'ont':
          const { count: total, rows: items } = await ONTStakingContribute.findAndCountAll(
          {
            limit,
            offset,
            where:{
              status: TransactionStatus.CONFIRMED,
              calculate_reward: false
            },
            order: [['block_from', 'ASC']]
          })
          return res.ok({
            items: accountContributionMapper(items) && items.length > 0 ? accountContributionMapper(items) : [],
            offset: offset,
            limit: limit,
            total: total
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
      let symbol = req.params.symbol
      let ids = req.body.ids
      if(!ids || ids.length < 1)
        return res.ok(false);
      switch(symbol.toLowerCase()){
        case 'cosmos':
          await CosmosAccountContribution.update({
            calculate_reward: true
          },{
            where:{
              id: {
                [Op.in]: ids
              }
            }
          })
          return res.ok(true);
        case 'iris':
          await IrisAccountContribution.update({
            calculate_reward: true
          },{
            where:{
              id: {
                [Op.in]: ids
              }
            }
          })
          return res.ok(true);
        case 'ont':
          await ONTStakingContribute.update({
            calculate_reward: true
          },{
            where:{
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