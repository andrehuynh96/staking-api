const logger = require("app/lib/logger");
const Partner = require("app/model").partners;
const PartnerAPIKey = require("app/model").partner_api_keys;

module.exports = {
    get: async (req, res, next) => {
        try {
            let apiKey = req.user.api_key
            let partnerApiKey = await PartnerAPIKey.findOne({
                where: {
                    api_key: apiKey
                }
            })
            if (!partnerApiKey) {
                return res.badRequest(res.__("NOT_FOUND_CLIENT"), "NOT_FOUND_CLIENT", { fields: ['token'] });
            }
            let partner = await Partner.findOne({
                where: {
                    id: partnerApiKey.partner_id
                }
            })
            return res.ok(partner)
        }
        catch (err) {
            logger.error("get partner info fail:", err);
			next(err)
        }
    }
}