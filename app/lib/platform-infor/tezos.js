const logger = require('app/lib/logger');
const config = require("app/config");
const axios = require('axios');
const BigNumber = require('bignumber.js');

module.exports = {
  getTransaction: async ({ from_address }) => {
    return await _getTransaction( from_address );
  },
  getAmountOfTransaction: async ({ from_address }) => {
    try {
      const res =await _getTransaction(from_address);
      if(res){
        return BigNumber(res.balance).times(BigNumber(10).pow(-6)).toFixed();
      }
      return null;
    } catch (err) {
      logger.error('Tezos getAmountOfTransaction no found data with platform and tx_id' + from_address, err);
        return null;
    }
  }
};

async function _getTransaction(from_address){
  try {
    const path = config.tezosUrlServer + `/chains/main/blocks/head/context/contracts/${from_address}`;
    const data = await _makeRequest(path, 'GET', null);
    return data;
  } catch (err) {
    logger.error('Tezos getTransaction no found data with platform and tx_id' + from_address, err);
      return null;
  }
}

async function _makeRequest(path, method, data){
  try {
      let options = {
        method: method,
        url: path,
        qs: {
          chain: 'main',
        },
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      let result = await axios(options);
      return result.data;
  } catch (err) {
      console.log(err);
      return null;
  } 
}
