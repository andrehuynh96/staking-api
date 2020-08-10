const InfinitoApi = require("node-infinito-api");
const logger = require('app/lib/logger');
const config = require("app/config");
const axios = require('axios');
const opts = {
  apiKey: config.sdk.apiKey,
  secret: config.sdk.secretKey,
  baseUrl: config.sdk.baseUrl
};
const api = new InfinitoApi(opts);

module.exports = {
  getPlatformBalance: async ({ platform, tx_id, address }) => {
    try {
      switch(platform.toLowerCase()) {
        case 'iris':
        case 'atom':
          return await _getPlatfromBalanceIBP(platform, tx_id);
        case 'one': 
        case 'xtz':
          return await _getPlatfromBalanceTezos(address, platform);
        case 'ont':
          return await _getPlatfromBalanceONT(tx_id);
      }
      
      // return null;
    }
    catch (err) {
      logger.info('api.getTransaction no found data with platform and tx_id' + platform + '/' + tx_id, err);
      throw err;
    }
  }
};

async function _getPlatfromBalanceIBP(platform, tx_id){
  const coinAPI= api.getChainService()[platform];
      const {data}=await coinAPI.getTransaction(tx_id);
      console.log('getTransaction', data);
      const txEvents = JSON.parse(data.raw_log)[0].events;
      console.log('txEvents',txEvents);
      const txDelegate = txEvents.filter(x => x.type == 'delegate');
      if(txDelegate){
        return txDelegate[0].attributes.filter(x => x.key == 'amount')[0].value;
      }
      return null;
}

async function _getPlatfromBalanceTezos(address, platform){
  try {
    const path = config.tezosUrlServer + `/chains/main/blocks/head/context/contracts/${address}`;
    const data = await _makeRequest(path, 'GET', null, platform);
    return data.balance;
  } catch (err) {
      console.log(err);
      return null;
  }
}

async function _makeRequest(path, method, data, platform){
  try {
      let options = {
        method: method,
        url: path,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      if(platform && platform.toLowerCase() === 'xtz'){
        options.qs = {
          chain: 'main',
        }
      }
      let result = await axios(options);
      return result.data;
  } catch (err) {
      console.log(err);
      return null;
  } 
}

async function _getPlatfromBalanceONT(tx_id){
  try {
    const path = config.ONTUrlServer + `/v2/transactions/${tx_id}`;
    const data = await _makeRequest(path, 'GET', null, null);
    const txDetail = data.result.detail.transfers.filter(el=>el.asset_name=='ont');
    if(txDetail.length > 0){
      return txDetail[0].amount;
    }
    return null;
  } catch (err) {
      console.log(err);
      return null;
  }
}