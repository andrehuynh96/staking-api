
const logger = require("app/lib/logger");
const config = require("app/config");
const CosmosAccount = require("app/model").cosmos_accounts;
const IrisAccount = require("app/model").iris_accounts;
const Client = require("app/model").clients;
const DistributeCommission = require("app/model").distribute_commission_histories;
const Insight = require("app/insight");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      let fuc = commission.ALL[req.params.platform.toUpperCase()];
      if (!fuc) {
        return res.badRequest(res.__("UNSUPPORT_PLATFORM"), "UNSUPPORT_PLATFORM");
      }

      let result = await fuc();
      return res.ok(result);
    }
    catch (err) {
      logger.error("get all partner commission fail:", err);
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      let partnerId = req.params.id;
      let client = await Client.findOne({
        where: {
          id: partnerId
        }
      });
      if (!client) {
        return res.notfound(res.__("NOT_FOUND_PARTNER"), "NOT_FOUND_PARTNER");
      }

      let fuc = commission.PARTNER[req.params.platform.toUpperCase()];
      if (!fuc) {
        return res.badRequest(res.__("UNSUPPORT_PLATFORM"), "UNSUPPORT_PLATFORM");
      }

      let result = await fuc(partnerId);
      return res.ok(result);
    }
    catch (err) {
      logger.error("get partner commission fail:", err);
      next(err);
    }
  }
}

const commission = {
  ALL: {
    ATOM: async () => {

    },
    IRIS: async () => {

    }
  },
  PARTNER: {
    ATOM: async (partnerId) => {

    },
    IRIS: async (partnerId) => {

    }
  }
}