const logger = require('app/lib/logger');
const config = require("app/config");
const axios = require('axios');

module.exports = {
  getTransaction: async ({ tx_id }) => {
    return await _getTransaction(tx_id);
  },
  getAmountOfTransaction: async ({ tx_id }) => {
    try {
      const res = await _getTransaction(tx_id);
      if(res){
        return res.amount;
      }
      return null;
    } catch (err) {
      logger.info('ONT getAmountOfTransaction no found data with platform and tx_id' + tx_id, err);
        return null;
    }
  }
};

async function _getTransaction(tx_id) {
  try {
    const path = config.ontUrlServer + `/v2/transactions/${tx_id}`;
    const data = await _makeRequest(path, 'GET', null);
    const transfers = data.result.detail.transfers;
    if(transfers){
      const txDetail = transfers.filter(el=>el.asset_name=='ont');
      if(txDetail.length > 0){
        return txDetail[0];
      }
    }
    return null;
  } catch (err) {
    logger.info('ONT getTransaction no found data with platform and tx_id' + tx_id, err);
      return null;
  }
}


async function _makeRequest(path, method, data){
  try {
      let options = {
        method: method,
        url: path,
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