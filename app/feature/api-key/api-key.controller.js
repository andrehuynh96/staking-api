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
      if (req.user.api_key != apiKey)
        return res.badRequest(res.__("NOT_FOUND_API_KEY"), "NOT_FOUND_API_KEY", { fields: ['key'] });

      let key = await ClientKey.update({
        actived_flg: false
      }, {
        where: {
          api_key: req.user.api_key,
          partner_id: req.user.client_id,
          actived_flg: true
        }
      });
      if (!key) {
        return res.badRequest(res.__("NOT_FOUND_API_KEY"), "NOT_FOUND_API_KEY");
      }
      return res.ok(true);
    }
    catch (err) {
      logger.error("Authentication fail:", err);
      next(err);
    }
  }
}