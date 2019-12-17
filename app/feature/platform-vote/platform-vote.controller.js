const logger = require("app/lib/logger");
const config = require("app/config");
const PlatformVote = require("app/model").platform_votes;
const Model = require("app/model");

const ModelConfig = {
  ATOM: Model.cosmos_configs,
  IRIS: Model.iris_configs
}

///validator_address
module.exports = async (req, res, next) => {
  try {
    let items = await PlatformVote.findAll({
      where: {
        active_flg: true
      },
      raw: true
    });
    if (items && items.length > 0) {
      for (let e of items) {
        e.validator_address = "";
        let validator = await ModelConfig[e.symbol].findOne({
          where: {
            active_flg: true
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
    return res.ok(items);
  }
  catch (err) {
    logger.error("get platform vote fail:", err);
    next(err);
  }
}

