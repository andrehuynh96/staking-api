const logger = require('app/lib/logger');
const TrackingVote = require("app/model").tracking_votes;
const PartnerMeno = require("app/model").partner_tx_memos;
const bech32 = require("bech32");
//const PlatformInfor = require("app/lib/platform-infor");

module.exports = {
  track: async (req, res, next) => {
    try {
      let memo = await PartnerMeno.findOne({
        where: {
          memo: req.body.memo,
          partner_id: req.user.client_id
        }
      });
      if (!memo) {
        return res.badRequest(res.__("NOT_FOUND_MEMO"), "NOT_FOUND_MEMO");
      }

      let old = await TrackingVote.findOne({
        where: {
          tx_id: req.body.tx_id,
          platform: memo.platform
        }
      });

      if (old) {
        return res.badRequest(res.__("TX_REGISTERED_ALREADY"), "TX_REGISTERED_ALREADY");
      }

      // const platformBalance = await PlatformInfor.getPlatformBalance({platform: memo.platform, tx_id: req.body.tx_id, address: req.body.voter_address});
      // if(platformBalance != -1 && platformBalance != req.body.amount){
      //   return res.badRequest(res.__("TX_AMOUNT_INCORRECT"), "TX_AMOUNT_INCORRECT");
      // }

      let stakeAddress = _getStakeAddress(memo.platform, req.body.voter_address);
      let result = await TrackingVote.create({
        tx_id: req.body.tx_id,
        voter_address: req.body.voter_address,
        platform: memo.platform,
        partner_id: req.user.client_id,
        memo: req.body.memo,
        type: req.body.type,
        balance: req.body.amount || 0,
        stake_address: stakeAddress
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
  },

  track3rd: async (req, res, next) => {
    try {
      console.log('track3rd req.body.memo', req.body.memo);

      let memo = await PartnerMeno.findOne({
        where: {
          memo: req.body.memo
        }
      });
      if (!memo) {
        return res.badRequest(res.__("NOT_FOUND_MEMO"), "NOT_FOUND_MEMO");
      }

      let old = await TrackingVote.findOne({
        where: {
          tx_id: req.body.tx_id,
          platform: memo.platform
        }
      });

      if (old) {
        return res.badRequest(res.__("TX_REGISTERED_ALREADY"), "TX_REGISTERED_ALREADY");
      }

      // const platformBalance = await PlatformInfor.getPlatformBalance({platform: memo.platform, tx_id: req.body.tx_id, address: req.body.voter_address});
      // if(platformBalance != -1 && platformBalance != req.body.amount){
      //   return res.badRequest(res.__("TX_AMOUNT_INCORRECT"), "TX_AMOUNT_INCORRECT");
      // }

      let stakeAddress = _getStakeAddress(memo.platform, req.body.voter_address);
      let result = await TrackingVote.create({
        tx_id: req.body.tx_id,
        voter_address: req.body.voter_address,
        platform: memo.platform,
        partner_id: req.user.client_id,
        memo: req.body.memo,
        type: req.body.type,
        balance: req.body.amount || 0,
        stake_address: stakeAddress
      });
      if (result) {
        return res.ok(true);
      }

      return res.serverInternalError();
    }
    catch (err) {
      logger.error("tracking voting 3rd party fail:", err);
      next(err);
    }
  }
}

function _getStakeAddress(platform, address) {
  switch (platform) {
    case "ADA":
    case "TADA": {
      let decodedAddr = bech32.decode(address, 200);
      let bytes = Buffer.from(bech32.fromWords(decodedAddr.words, 'hex'));
      let hexKeys = bytes.toString('hex').slice(2);
      let length = hexKeys.length;
      let stakeKey = hexKeys.slice(length / 2);
      let stakeAddr = bech32.encode('stake', bech32.toWords(Buffer.from('e1' + stakeKey, 'hex')));
      return stakeAddr;
    }
    default: {
      return "";
    }
  }
}