const logger = require('app/lib/logger');
const config = require('app/config');
const TxMemo = require('app/model').partner_tx_memos;
const Partner = require('app/model').partners;
const mapper = require('app/feature/response-schema/partner-tx-memo.response-schema');
const database = require('app/lib/database').db().staking;
const StakingPlatform = require("app/model").staking_platforms;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  all: async (req, res, next) => {
    try {
      logger.info('partner-tx-memo::all');
      let partner = await Partner.findOne({
        where: {
          id: req.params.partner_id
        }
      });
      if (req.user.client_id != req.params.partner_id && partner.parent_id != req.user.client_id) {
        return res.badRequest(res.__("NOT_FOUND_CLIENT"), "NOT_FOUND_CLIENT", { fields: ['partner_id'] });
      }
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      let offset = req.query.offset ? parseInt(req.query.offset) : 0;
      const where = { partner_id: req.params.partner_id, default_flg: true };
      const { count: total, rows: partner_tx_memos } = await TxMemo.findAndCountAll({ limit, offset, where: where, order: [['platform', 'ASC']] });

      let platforms = partner_tx_memos.map(x => x.platform);
      let defaultPlatfrom = await _getPlatform(platforms);
      let result = partner_tx_memos.concat(defaultPlatfrom);

      return res.ok({
        items: mapper(result),
        offset: offset,
        limit: limit,
        total: total
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  create: async (req, res, next) => {
    let transaction;
    try {
      logger.info('partner-tx-memo::create');
      const { params: { partner_id }, body: { items, user_id } } = req;
      let partner = await Partner.findOne({
        where: {
          id: partner_id
        }
      });
      if (req.user.client_id != partner_id && partner.parent_id != req.user.client_id) {
        return res.badRequest(res.__("NOT_FOUND_CLIENT"), "NOT_FOUND_CLIENT", { fields: ['partner_id'] });
      }
      let updatedItems = [];
      let insertedItems = [];
      transaction = await database.transaction();
      for (let item of items) {
        let condition = {
          partner_id: partner_id,
          platform: item.platform,
          default_flg: true
        };
        let txMemo = await TxMemo.findOne({ where: condition });
        condition.memo = item.memo;
        let existMemo = await TxMemo.findOne({ where: condition });
        if (!existMemo) {
          item.created_by = user_id;
          item.updated_by = user_id;
          item.partner_id = partner_id;
          item.default_flg = true;
          item.partner_updated_by = partner_id
          insertedItems.push(item);
          if (txMemo && txMemo.id) updatedItems.push(txMemo.id);
        }
      }
      let partner_tx_memos = await TxMemo.bulkCreate(insertedItems, { transaction });
      await TxMemo.update({
        default_flg: false,
        updated_by: user_id
      }, {
          where: {
            id: updatedItems
          }
        }, { transaction });
      logger.info('partner-tx-memo::update::partner-tx-memo::', JSON.stringify(partner_tx_memos));
      await transaction.commit();
      return res.ok({
        items: partner_tx_memos.map(item => mapper(item))
      });
    } catch (error) {
      logger.error(error);
      if (transaction) await transaction.rollback();
      next(error);
    }
  },
  getHis: async (req, res, next) => {
    try {
      logger.info('partner-tx-memo::all::histories');
      let partner = await Partner.findOne({
        where: {
          id: req.params.partner_id
        }
      });
      if (req.user.client_id != req.params.partner_id && partner.parent_id != req.user.client_id) {
        return res.badRequest(res.__("NOT_FOUND_CLIENT"), "NOT_FOUND_CLIENT", { fields: ['partner_id'] });
      }
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      let offset = req.query.offset ? parseInt(req.query.offset) : 0;
      const where = { partner_id: req.params.partner_id, default_flg: false };
      const { count: total, rows: partner_tx_memos } = await TxMemo.findAndCountAll({ limit, offset, where: where, order: [['platform', 'ASC']] });
      return res.ok({
        items: partner_tx_memos.map(item => mapper(item)),
        offset: offset,
        limit: limit,
        total: total
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
}


async function _getPlatform(platformDefaults = []) {
  let platforms = await StakingPlatform.findAll({
    where: {
      deleted_flg: false,
      using_memo_flg: true,
      platform: {
        [Op.notIn]: platformDefaults
      }
    }
  });
  if (platforms && platforms.length > 0) {
    platforms = platforms.map(x => {
      return {
        platform: x.platform,
        memo: "",
        id: x.id
      }
    });
    return platforms;
  }

  return [];
}