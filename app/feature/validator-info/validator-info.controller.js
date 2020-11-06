const logger = require('app/lib/logger');
const config = require('app/config');
const Validator = require('app/model').validators;
const Status = require("app/model/value-object/validator-status");

const mapper = require('app/feature/response-schema/validator-info.response-schema');

module.exports = {
  get: async (req, res, next) => {
    try {
      let platform = req.params.platform ? req.params.platform.toUpperCase() : null;
      if (!platform) {
        return res.badRequest(res.__("NOT_FOUND_PLATFORM"), "NOT_FOUND_PLATFORM");
      }

      platform = (platform == "TADA" || platform == "ADA") ? ["ADA", "TADA"] : platform;
      let where = {
        platform: platform,
        status: Status.ENABLED
      };
      if (req.query.status) {
        switch (req.query.status) {
          case 'all': {
            where.status = Object.values(Status);
            break;
          }
          case 'deactive': {
            where.status = Status.DISABLED;
            break;
          }
          case 'active':
          default: {
            where.status = Status.ENABLED
            break;
          }
        }
      }

      let items = await Validator.findAll({ where: where, order: [['order', 'ASC']] });
      return res.ok(mapper(items));
    }
    catch (err) {
      logger.error('get list validator fail:', err);
      next(err);
    }
  }
}