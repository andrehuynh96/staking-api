
const logger = require("app/lib/logger");
const StakingPlatform = require("app/model").staking_platforms;
const PartnerCommission = require("app/model").partner_commissions;
const PartnerCommissionHis = require("app/model").partner_commissions_his;
const StakingPlatformStatus = require("app/model/value-object/staking-platform-status");
const mapper = require('app/feature/response-schema/partner-commission.response-schema');
const database = require('app/lib/database').instanse;
const { Op } = require("sequelize");
const bech32 = require("bech32");
const WAValidator = require("wallet-address-validator");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      logger.info('partner-commission::all');
      const { query: { offset, limit }, params: { partner_id } } = req;
      const where = { partner_id: partner_id };
      const off = parseInt(offset) || 0;
      const lim = parseInt(limit) || 10;
      let { count: total, rows: partner_commissions } = await PartnerCommission.findAndCountAll({ offset: off, limit: lim, where: where, order: [['platform', 'ASC']] });
      let stakingPlatformIds = [];
      if (partner_commissions && partner_commissions.length > 0) {
        stakingPlatformIds = partner_commissions.map(x => x.staking_platform_id);
        partner_commissions = await _getSymbol(partner_commissions, stakingPlatformIds);
      }
      let defaultPlatfrom = await _getPlatformNotConfig(stakingPlatformIds);
      let result = partner_commissions.concat(defaultPlatfrom);
      return res.ok({
        items: result && result.length > 0 ? mapper(result) : [],
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
      let { count: total, rows: partner_commissions_his } = await PartnerCommissionHis.findAndCountAll({ offset: off, limit: lim, where: where, order: [['updated_at', 'DESC']] });
      if (partner_commissions_his && partner_commissions_his.length > 0) {
        let stakingPlatformIds = partner_commissions_his.map(x => x.staking_platform_id);
        partner_commissions_his = await _getSymbol(partner_commissions_his, stakingPlatformIds);
      }
      return res.ok({
        items: partner_commissions_his && partner_commissions_his.length ? mapper(partner_commissions_his) : [],
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

      let checkAddressMessage = _checkListAddress(items);
      if (checkAddressMessage.length > 0) {
        return res.badRequest(checkAddressMessage);
      }

      transaction = await database.transaction();
      for (let item of items) {
        if (!item.id) {
          if (item.id == null || item.id == "") {
            delete item.id;
          }
          item.created_by = updated_by;
          item.updated_by = updated_by;
          item.partner_id = partner_id;
          item.partner_updated_by = req.user.client_id;
          if (item.reward_address) {
            insertedItems.push(item);
          }
        } else {
          item.updated_by = updated_by;
          item.partner_updated_by = req.user.client_id;
          let allowedField = ['updated_by', 'partner_updated_by', 'commission'];
          let filteredItem = Object.keys(item)
            .filter(key => allowedField.includes(key))
            .reduce((obj, key) => {
              obj[key] = item[key];
              return obj;
            }, {});
          let [_, updatedCommission] = await PartnerCommission.update(filteredItem, {
            where: {
              id: item.id
            }, returning: true
          }, { transaction });
          updatedCommissions.push(updatedCommission);
        }
      }
      let insertedCommissions = await PartnerCommission.bulkCreate(insertedItems, { transaction });
      let partner_commissions = insertedCommissions.concat(updatedCommissions);
      await transaction.commit();
      let stakingPlatformIds = partner_commissions.map(x => x.staking_platform_id);
      partner_commissions = await _getSymbol(partner_commissions, stakingPlatformIds);
      return res.ok(mapper(partner_commissions));
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
      let { count: total, rows: partner_commissions } = await PartnerCommission.findAndCountAll({ offset: off, limit: lim, where: where, order: [['platform', 'ASC']] });
      if (partner_commissions && partner_commissions.length > 0) {
        let stakingPlatformIds = partner_commissions.map(x => x.staking_platform_id);
        partner_commissions = await _getSymbol(partner_commissions, stakingPlatformIds);
      }
      return res.ok({
        items: partner_commissions && partner_commissions.length ? mapper(partner_commissions) : [],
        offset: off,
        limit: lim,
        total: total
      });
    }
    catch (err) {
      logger.error("get commission by platform fail:", err);
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
      if (response && response.length > 0) {
        let stakingPlatformIds = response.map(x => x.staking_platform_id);
        response = await _getSymbol(response, stakingPlatformIds);
      }


      return res.ok(mapper(response));
    }
    catch (err) {
      logger.error("get commission fail:", err);
      next(err);
    }
  },
  getAllByPartner: async (req, res, next) => {
    try {
      logger.info('partner-commission::all::getAllByPartner');
      const { query: { offset, limit } } = req;
      const where = { partner_id: req.user.client_id };
      const off = parseInt(offset) || 0;
      const lim = parseInt(limit) || 10;
      let { count: total, rows: partner_commissions } = await PartnerCommission.findAndCountAll({ offset: off, limit: lim, where: where, order: [['platform', 'ASC']] });
      if (partner_commissions && partner_commissions.length > 0) {
        let stakingPlatformIds = partner_commissions.map(x => x.staking_platform_id);
        partner_commissions = await _getSymbol(partner_commissions, stakingPlatformIds);
      }

      return res.ok({
        items: partner_commissions && partner_commissions.length ? mapper(partner_commissions) : [],
        offset: off,
        limit: lim,
        total: total
      });
    }
    catch (err) {
      logger.error("get commission by partner fail:", err);
      next(err);
    }
  }
}

const _getPlatformNotConfig = async (stakingPlatformIds) => {
  let result = await StakingPlatform.findAll({
    attributes: ['id', 'platform', 'symbol', 'symbol'],
    where: {
      id: {
        [Op.notIn]: stakingPlatformIds
      },
      status: StakingPlatformStatus.ENABLED
    }
  })

  if (result && result.length > 0) {
    result = result.map(x => {
      return {
        id: "",
        commission: 0,
        reward_address: "",
        staking_platform_id: x.id,
        platform: x.platform,
        symbol: x.symbol,
      }
    });
    return result;
  }

  return [];

}


function _checkListAddress(data) {
  let errorMessage = "";
  if (data && data.length > 0) {
    for (let e of data) {
      if (e.id) {
        continue;
      }

      if (!e.reward_address && e.commission == 0) {
        continue;
      }

      let valid = false;
      if (e.platform == "ATOM") {
        valid = _verifyCosmosAddress(e.reward_address);
      } else if (e.platform == "IRIS") {
        valid = _verifyIrisAddress(e.reward_address);
      } else {
        valid = WAValidator.validate(e.reward_address, e.platform, "testnet");
        valid = valid ? true : WAValidator.validate(e.reward_address, e.platform);
      }
      if (!valid) {
        errorMessage = `invalid address of ${e.platform}!`;
        break;
      }
    }
  }
  return errorMessage;
}

const _getSymbol = async (commissions, stakingPlatformIds) => {
  let result = await StakingPlatform.findAll({
    attributes: ['id', 'platform', 'symbol'],
    where: {
      id: {
        [Op.in]: stakingPlatformIds
      }
    }
  });

  for (let e of commissions) {
    let i = result.filter(x => x.id == e.staking_platform_id);
    if (i && i.length > 0) {
      e.symbol = i[0].symbol
    }
  }

  return commissions;
}

function _verifyCosmosAddress(address) {
  try {
    let result = bech32.decode(address.toLowerCase());
    return result.prefix == "cosmos";
  } catch (e) {
    logger.error(e);
    return false;
  }
}

function _verifyIrisAddress(address) {
  try {
    let result = bech32.decode(address.toLowerCase());
    return result.prefix == "iaa";
  } catch (e) {
    logger.error(e);
    return false;
  }
}
