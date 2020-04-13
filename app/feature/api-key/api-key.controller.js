const logger = require("app/lib/logger");
const Partner = require("app/model").partners;
const ClientKey = require("app/model").partner_api_keys;
const ApiKeyStatus = require("app/model/value-object/api-key-status");

module.exports = {
  revokeAPIKey: async (req, res, next) => {
    try {
      let { id: partnerId, key: apiKey } = req.params;
      
      if (req.user.client_id != partnerId)
        return res.badRequest(res.__("NOT_FOUND_CLIENT"), "NOT_FOUND_CLIENT", { fields: ['id'] });

      let key = await ClientKey.findOne({
        where: {
          api_key: apiKey,
          partner_id: partnerId
        }
      });
      if (!key) {
        return res.badRequest(res.__("NOT_FOUND_API_KEY"), "NOT_FOUND_API_KEY");
      }

      key = await ClientKey.update({
        actived_flg: false
      }, {
        where: {
          id: key.id
        }
      });
      return res.ok(true);
    }
    catch (err) {
      logger.error("Authentication fail:", err);
      next(err);
    }
  }
}