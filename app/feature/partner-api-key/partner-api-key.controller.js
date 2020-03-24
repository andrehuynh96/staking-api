const logger = require("app/lib/logger");
const config = require("app/config");
const Partner = require("app/model").partners;
const PartnerAPIKey = require("app/model").partner_api_keys;
const Hashids = require('hashids/cjs')
const hashids = new Hashids()

module.exports = {
    getAll: async(req, res, next) => {
		try {
			let limit = req.query.limit ? parseInt(req.query.limit) : 10;
			let offset = req.query.offset ? parseInt(req.query.offset) : 0;
			let where = { partner_id: req.params.id};
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
	create: async(req, res, next) => {
		try {
			let secret_key = hashids.encode(
				Date.now(),
				Math.floor(Math.random(1000) * 1000 + 1)
			)
			let data = {
				partner_id: req.body.partner_id,
				name: req.body.name,
				secret_key: secret_key,
				actived_flg: true,
				created_by: req.body.user_id
			}
			let APIkey = await PartnerAPIKey.create(data)
			if (!APIkey) return res.serverInternalError();
			return res.ok(APIkey);
		}
		catch(err){
			logger.error("create new api key fail:", err);
			next(err);
		}
	}
}