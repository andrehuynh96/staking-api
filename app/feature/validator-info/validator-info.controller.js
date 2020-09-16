const logger = require('app/lib/logger');
const config = require('app/config');
const Validator = require('app/model').validators;
const mapper = require('app/feature/response-schema/validator-info.response-schema');

module.exports = {
  get: async (req, res, next) => {
    try {
      logger.info('validator::list');
      let platform = req.params.platform ? req.params.platform.toUpperCase() : null;
      if (!platform) {
        return res.badRequest(res.__("NOT_FOUND_PLATFORM"), "NOT_FOUND_PLATFORM");
      }

      platform = (platform == "ADA") ? "TADA" : platform;

      let where = {
        platform: platform
      };
      let items = await Validator.findAll({ where: where, order: [['order', 'ASC']] });

      return res.ok(mapper(items));
    }
    catch (err) {
      logger.error('get list validator fail:', err);
      next(err);
    }
  }
}