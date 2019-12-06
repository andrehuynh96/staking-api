const logger = require("app/lib/logger");
const config = require("app/config");
const TempVote = require("app/model").temp_votes;
const MemoClient = require("app/model").client_memos;

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

    let clientMemo = await MemoClient.findOne({
      where: {
        memo: req.body.memo,
        client_id: req.user.client_id
      }
    });

    if (!clientMemo) {
      return res.badRequest(res.__("NOT_FOUND_MEMO"), "NOT_FOUND_MEMO");
    }

    let result = await TempVote.create({
      tx_id: req.body.tx_id,
      voter_address: req.body.voter_address,
      platform: clientMemo.platform,
      client_id: req.user.client_id,
      memo: req.body.memo,
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