const logger = require("app/lib/logger");
const Partner = require("app/model").partners;
const PartnerAPIKey = require("app/model").partner_api_keys;

module.exports = {
    get: async (req, res, next) => {
        try {
            let partner_id = req.user.client_id
            let partner = await Partner.findOne({
                where: {
                    id: partner_id
                }
            })
            if (!partner) {
                return res.badRequest(res.__("NOT_FOUND_CLIENT"), "NOT_FOUND_CLIENT", { fields: ['token'] });
            }
            return res.ok(partner)
        }
        catch (err) {
            logger.error("get partner info fail:", err);
			next(err)
        }
    }
}