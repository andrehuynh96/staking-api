const logger = require("app/lib/logger");
const config = require("app/config");
const PlatformVote = require("app/model").platform_votes;

module.exports = async (req, res, next) => {
  try {
    let items = await PlatformVote.find({
      where: {
        active_flg: true
      }
    });
    return res.ok(items);
  }
  catch (err) {
    logger.error("get platform vote fail:", err);
    next(err);
  }
}