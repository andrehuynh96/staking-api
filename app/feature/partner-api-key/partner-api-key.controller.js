const logger = require("app/lib/logger");
const config = require("app/config");
const Partner = require("app/model").partners;
const PartnerAPIKey = require("app/model").partner_api_keys;
const Hashids = require('hashids/cjs')

module.exports = {
	getAll: async (req, res, next) => {
		try {
			let partner = await Partner.findOne({
				where: {
					id: req.params.id
				}
			});
			if (req.user.client_id != req.params.id && partner.parent_id != req.user.client_id)
				return res.badRequest(res.__("NOT_FOUND_CLIENT"), "NOT_FOUND_CLIENT", { fields: ['id'] });
			let limit = req.query.limit ? parseInt(req.query.limit) : 10;
			let offset = req.query.offset ? parseInt(req.query.offset) : 0;
			let where = { partner_id: req.params.id, actived_flg: true };
			const { count: total, rows: items } = await PartnerAPIKey.findAndCountAll({ limit, offset, where: where, order: [['created_at', 'DESC']] });
			return res.ok({
				items: items,
				offset: offset,
				limit: limit,
				total: total
			});
		}
		catch (err) {
			logger.error("get list api key fail:", err);
			next(err);
		}
	},
	create: async (req, res, next) => {
		try {
			let partner = await Partner.findOne({
				where: {
					id: req.params.id
				}
			});
			if (req.user.client_id != req.params.id && partner.parent_id != req.user.client_id)
				return res.badRequest(res.__("NOT_FOUND_CLIENT"), "NOT_FOUND_CLIENT", { fields: ['id'] });
			const hashids = new Hashids(req.body.name, 32)
			let secret_key = hashids.encode(
				Date.now(),
				Math.floor(Math.random(1000) * 1000 + 1)
			)
			let data = {
				partner_id: req.params.id,
				name: req.body.name,
				secret_key: secret_key,
				actived_flg: true,
				created_by: 0,
				partner_updated_by: req.user.client_id
			}
			let APIkey = await PartnerAPIKey.create(data)
			if (!APIkey) return res.serverInternalError();
			return res.ok(APIkey);
		}
		catch (err) {
			logger.error("create new api key fail:", err);
			next(err);
		}
	}
}
