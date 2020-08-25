const logger = require('app/lib/logger');
const config = require("app/config");
const core = require('@harmony-js/core');
const utils = require('@harmony-js/utils');
const bigN = require('bignumber.js');

module.exports = {
  getTransaction: async ({tx_id: tx_id}) => {
    return await _getTransaction( tx_id);
  },
  getAmountOfTransaction: async ({ tx_id }) => {
    try {
      const result = await _getTransaction(tx_id);
      if(result){
        return bigN(result.value).div(1e18).toFixed();
      }
    } catch (err) {
      logger.error('Harmony getAmountOfTransaction no found data with tx_id' + tx_id, err);
      return null;
    }
  }
};

async function _getTransaction(tx_id){
  try {
    const netWorkHmy = await _getHarmonyConfig();
    const info = await netWorkHmy.hmy.blockchain.getTransactionByHash({
      txnHash: tx_id
    })
    return info.result;
  } catch (err) {
    logger.error('Harmony getTransaction no found data with tx_id' + tx_id, err);
    return null;
  }
}

async function _getHarmonyConfig(){
  const chainType = utils.ChainType.Harmony;
  let chainID = null;
  if (config.one.testnet == 1) {
    chainID = utils.ChainID.HmyTestnet;
  } else {
    chainID = utils.ChainID.HmyMainnet;
  }

  let hmy = new core.Harmony(
    config.one.baseUrl,
    {
      chainType: chainType,
      chainId: chainID
    }
  );
  return {
    hmy: hmy
  };
}