const logger = require("app/lib/logger");
const config = require("app/config");
const Partner = require("app/model").partners;
const PartnerAPIKey = require("app/model").partner_api_keys;
const PartnerCommission = require("app/model").partner_commissions;

module.exports = {
	create: async (req, res, next) => {
		try {
			let partner = await Partner.create({
				email: req.body.email,
				name: req.body.name,
				parent_id: req.user.client_id,
				partner_type: req.body.partner_type,
				actived_flg: true,
				deleted_flg: false,
				created_by: req.body.created_by,
				updated_by: 0
			})
			if (!partner) return res.serverInternalError();
			return res.ok(partner);
		}
		catch (err) {
			logger.error("create grandchild fail:", err);
			next(err);
		}
	},
	getAll: async (req, res, next) => {
		try {
			let limit = req.query.limit ? parseInt(req.query.limit) : 10;
			let offset = req.query.offset ? parseInt(req.query.offset) : 0;
			let where = { parent_id: req.user.client_id };
			const { count: total, rows: items } = await Partner.findAndCountAll({ limit, offset, where: where, order: [['created_at', 'DESC']] });
			return res.ok({
				items: items,
				offset: offset,
				limit: limit,
				total: total
			});
		}
		catch (err) {
			logger.error("get list grandchild fail:", err);
			next(err);
		}
	},
	update: async (req, res, next) => {
		try {
			let partner = await Partner.findOne({
				where: {
					id: req.params.id
				}
			})
			if (!partner) return res.badRequest(res.__("NOT_FOUND_PARTNER"), "NOT_FOUND_PARTNER", { fields: ['id'] });

			await Partner.update({
				name: req.body.name,
				updated_by: req.body.updated_by
			}, {
				where: {
					id: req.params.id
				}
			});
			partner.name = req.body.name;
			return res.ok(partner);
		}
		catch (err) {
			logger.error("update grandchild fail:", err);
			next(err);
		}
	},
	get: async (req, res, next) => {
		try {
			let partner = await Partner.findOne({
				where: {
					id: req.params.id
				}
			})
			if (!partner) return res.badRequest(res.__("NOT_FOUND_PARTNER"), "NOT_FOUND_PARTNER", { fields: ['id'] });
			return res.ok(partner);
		}
		catch (err) {
			logger.error("get grandchild fail:", err);
			next(err);
		}
	}
}