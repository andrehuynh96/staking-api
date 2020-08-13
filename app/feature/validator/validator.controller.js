const logger = require("app/lib/logger");
const config = require("app/config");
const axios = require('axios');
const BigNumber = require('bignumber.js');
module.exports = {
  get: async (req, res, next) => {
    try {
        let { platform, validator_address} = req.query;
        let validator = { uptime: "100%"};
        if (platform.toUpperCase() == 'XTZ') {
          let api = axios.create({
            baseURL: config.tezosUrlServer,
            timeout: 2000
          });
          let res = await api.get(`/chains/main/blocks/head/context/delegates/${validator_address}`);
          if (res.data) {
            validator.total_stake = BigNumber(res.data.staking_balance).times(BigNumber(10).pow(-6)).toNumber();
            validator.rolls = Math.round(validator.total_stake / 8000);
          }   
        } else if (platform.toUpperCase() == 'ATOM') {
          let api = axios.create({
            baseURL: config.atomUrlServer,
            timeout: 2000
          });
          let res = await api.get(`/staking/validators/${validator_address}`);
          if (res.data) {
            validator.total_stake = BigNumber(res.data.result.delegator_shares).times(BigNumber(10).pow(-6)).toNumber();
          } 
        } else if (platform.toUpperCase() == 'ONE') {
          let api = axios.create({
            baseURL: config.one.baseUrl,
            timeout: 2000
          });
          let res = await api.post('', {"jsonrpc": "2.0", "method": "hmy_getValidatorInformation", "params": [validator_address], "id": 1 });
          if (res.data) {
            validator.total_stake = BigNumber(res.data.result["total-delegation"]).times(BigNumber(10).pow(-18)).toNumber();
          } 
        } 
        return res.ok(validator)
    }
    catch (err) {
      logger.error("get validator info fail:", err);
      next(err)
    }
  }
}