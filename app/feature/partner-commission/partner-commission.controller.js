
const logger = require("app/lib/logger");
const PartnerCommission = require("app/model").partner_commissions;
const PartnerCommissionHis = require("app/model").partner_commissions_his;
const mapper = require('app/feature/response-schema/partner-commission.response-schema');
const database = require('app/lib/database').instanse;

module.exports = {
  getAll: async (req, res, next) => {
    try {
      logger.info('partner-commission::all');
      const { query: { offset, limit }, params: { partner_id } } = req;
      const where = { partner_id: partner_id };
      const off = parseInt(offset) || 0;
      const lim = parseInt(limit) || 10;
      const { count: total, rows: partner_commissions } = await PartnerCommission.findAndCountAll({ offset: off, limit: lim, where: where, order: [['platform', 'ASC']] });
      return res.ok({
        items: partner_commissions.map(item => mapper(item)),
        offset: off,
        limit: lim,
        total: total
      });
    }
    catch (err) {
      logger.error("get all partner commission fail:", err);
      next(err);
    }
  },
  getHis: async (req, res, next) => {
    try {
      logger.info('partner-commission::all::histories');
      const { query: { offset, limit }, params: { partner_id } } = req;
      const where = { partner_id: partner_id };
      const off = parseInt(offset) || 0;
      const lim = parseInt(limit) || 10;
      const { count: total, rows: partner_commissions_his } = await PartnerCommissionHis.findAndCountAll({ offset: off, limit: lim, where: where, order: [['platform', 'ASC']] });
      return res.ok({
        items: partner_commissions_his.map(item => mapper(item)),
        offset: off,
        limit: lim,
        total: total
      });
    }
    catch (err) {
      logger.error("get partner commission history fail:", err);
      next(err);
    }
  },
  update: async (req, res, next) => {
    let transaction;
    try {
      logger.info('partner-commission::update');
      const { params: { partner_id }, body: { items, updated_by } } = req;
      let updatedCommissions = [];
      let insertedItems = [];
      transaction = await database.transaction();
      for (let item of items) {
        if (!item.id) {
          item.created_by = updated_by;
          item.updated_by = updated_by;
          item.partner_id = partner_id;
          item.reward_address = '';
          insertedItems.push(item);
        } else {
          item.updated_by = updated_by;
          let [_, updatedCommission] = await PartnerCommission.update(item, {
            where: {
              id: item.id
            }, returning: true
          }, { transaction });
          updatedCommissions.push(updatedCommission);
        }
      }
      let insertedCommissions = await PartnerCommission.bulkCreate(insertedItems, { transaction });
      let partner_commissions = insertedCommissions.concat(updatedCommissions);
      logger.info('partner-commission::update::partner-commission::', JSON.stringify(partner_commissions));
      await transaction.commit();
      return res.ok(partner_commissions.map(item => mapper(item)));
    }
    catch (err) {
      logger.error("update commission fail:", err);
      if (transaction) await transaction.rollback();
      next(err);
    }
  },
  getAllByPlatform: async (req, res, next) => {
    try {
      logger.info('partner-commission::all::getAllByPlatform');
      const { query: { offset, limit }, params: { platform } } = req;
      const where = { platform };
      const off = parseInt(offset) || 0;
      const lim = parseInt(limit) || 10;
      const { count: total, rows: partner_commissions } = await PartnerCommission.findAndCountAll({ offset: off, limit: lim, where: where, order: [['platform', 'ASC']] });
      return res.ok({
        items: partner_commissions.map(item => mapper(item)),
        offset: off,
        limit: lim,
        total: total
      });
    }
    catch (err) {
      logger.error("get commission by platform fail:", err);
      if (transaction) await transaction.rollback();
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      logger.info('partner-commission::get');
      const { params: { partner_id, platform } } = req;
      const where = { platform, partner_id };
      let response = await PartnerCommission.findAll({
        where
      });
      return res.ok(response.map(item => mapper(item)));
    }
    catch (err) {
      logger.error("get commission fail:", err);
      if (transaction) await transaction.rollback();
      next(err);
    }
  },
}