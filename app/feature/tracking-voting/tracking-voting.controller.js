const logger = require("app/lib/logger");
const config = require("app/config");
const TempVote = require("app/model").temp_votes;

module.exports = async (req, res, next) => {
  try {
    let old = await TempVote.findOne({
      where: {
        tx_id: req.body.tx_id,
        platform: req.body.platform
      }
    });
    if (old) {
      return res.badRequest(res.__("TX_REGISTERED_ALREADY"), "TX_REGISTERED_ALREADY");
    }

    let result = await TempVote.create({
      tx_id: req.body.tx_id,
      platform: req.body.platform,
      client_id: req.user.client_id
    });
    if (result) {
      return res.ok(true);
    }

    return res.serverInternalError();
  }
  catch (err) {
    logger.error("tracking voting fail:", err);
    next(err);
  }
}