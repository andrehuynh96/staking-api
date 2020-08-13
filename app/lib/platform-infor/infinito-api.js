const InfinitoApi = require("node-infinito-api");
const logger = require('app/lib/logger');
const config = require("app/config");
const BigNumber = require('bignumber.js');
const opts = {
  apiKey: config.sdk.apiKey,
  secret: config.sdk.secretKey,
  baseUrl: config.sdk.baseUrl
};
const api = new InfinitoApi(opts);

module.exports = {
  getTransaction: async ({ platform, tx_id }) => {
    return await _getTransaction(platform, tx_id);
  },
  getAmountOfTransaction: async ({ platform, tx_id, address }) => {
    try {
      let amount = null;
      console.log('platform', platform.toLowerCase())
      switch(platform.toLowerCase()){
        case 'iris':
          amount = await _getAmountOfTransactionIRIS(platform, tx_id);
          break;
        case 'atom':
          amount = await _getAmountOfTransactionATOM(platform, tx_id);
          break;
        case 'ada': 
          amount = await _getAmountOfTransactionADA(address);
          break;
      }
      return amount;
    }catch (err) {
      logger.error('infinito getAmountTransaction no found data with platform and tx_id' + platform + '/' + tx_id, err);
      throw err;
    }
  }
};

async function _getAmountOfTransactionADA(address){
  try {
    const {data} = await api.ADA.getBalance(address);
    if(data){
      return BigNumber(data.balance).times(BigNumber(10).pow(-6)).toFixed();;
    }
    return null;
  }catch (err) {
    logger.error('infinito ADA getAmountTransaction no found data with address' + address, err);
    throw err;
  }
}

async function _getAmountOfTransactionIRIS(platform, tx_id){
  try {
    const res = await _getTransaction(platform, tx_id);
    if(res){
      const typeUnstake = 'irishub/stake/BeginUnbonding';
      const typStake = 'irishub/stake/MsgDelegate';
      const valueStake = res.tx.value.msg.filter(el=> [typeUnstake, typStake].includes(el.type));
      if(valueStake){
        let amount = null;
        if(valueStake[0].type == typStake){
          amount = BigNumber(valueStake[0].value.delegation.amount).times(BigNumber(10).pow(-18)).toFixed();
        }else if(valueStake[0].type == typeUnstake){
          amount = BigNumber(valueStake[0].value.shares_amount).times(BigNumber(10).pow(-18)).toFixed();
        }
        return amount;
      }
    }
    return null;
  }catch (err) {
    logger.error('infinito getAmountTransaction no found data with platform and tx_id' + platform + '/' + tx_id, err);
    throw err;
  }
}

async function _getAmountOfTransactionATOM(platform, tx_id){
  try {
    const res = await _getTransaction(platform, tx_id);
    const typeUnstake = 'cosmos-sdk/MsgUndelegate';
    const typStake = 'cosmos-sdk/MsgDelegate';
    if(res){
      const valueStake = res.tx.value.msg.filter(el=> [typeUnstake, typStake].includes(el.type));
      if(valueStake){
        let amount = null;
        if(valueStake[0].type == typStake){
          amount = BigNumber(valueStake[0].value.amount.amount).times(BigNumber(10).pow(-6)).toFixed();
        }else if(valueStake[0].type == typeUnstake){
          amount = BigNumber(valueStake[0].value.amount.amount).times(BigNumber(10).pow(-6)).toFixed();
        }
        return amount;
      }
    }
    return null;
  }catch (err) {
    logger.error('infinito getAmountTransaction no found data with platform and tx_id' + platform + '/' + tx_id, err);
    throw err;
  }
}

async function _getTransaction (platform, tx_id){
  try {
    const coinAPI= api.getChainService()[platform];
    const {data}=await coinAPI.getTransaction(tx_id);
    return data
  }
  catch (err) {
    logger.error('infinito api.getTransaction no found data with platform and tx_id' + platform + '/' + tx_id, err);
    throw err;
  }
}