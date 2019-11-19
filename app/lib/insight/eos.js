const Axios = require('axios');
const logger = require('app/lib/logger');
const config = require('app/config');

module.exports = {
  createAccount: async (data) => {
    try {
      let result = await Axios.post(`${config.insight.EOS}/create_account`, data);
      logger.info('create EOS account result:', JSON.stringify(result.data));
      return result.data;
    }
    catch (err) {
      logger.error('create EOS account fail:', err);
    }
    return null;
  }
}