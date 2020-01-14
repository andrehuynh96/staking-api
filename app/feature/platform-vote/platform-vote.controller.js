const logger = require("app/lib/logger");
const config = require("app/config");
const PlatformVote = require("app/model").staking_platforms;
const Model = require("app/model");

const ModelConfig = {
  ATOM: Model.cosmos_cfgs,
  IRIS: Model.iris_cfgs
}

module.exports = async (req, res, next) => {
  try {
    let items = await PlatformVote.findAll({
      where: {
        actived_flg: true
      },
      raw: true
    });
    if (items && items.length > 0) {
      for (let e of items) {
        if (!e.validator_address && ModelConfig[e.symbol]) {
          let validator = await ModelConfig[e.symbol].findOne({
            where: {
              actived_flg: true
            },
            order: [
              ['default', 'DESC'],
            ],
          });
          if (validator) {
            e.validator_address = validator.validator;
          }
        }
      }
    }
    return res.ok(items);
  }
  catch (err) {
    logger.error("get platform vote fail:", err);
    next(err);
  }
}

