const InfinitoApi = require("node-infinito-api");
const logger = require('app/lib/logger');
const config = require("app/config");
const ont = require("./ont");
const one = require("./harmony");
const xtz = require("./tezos");
const ibp = require("./infinito-api");
const opts = {
  apiKey: config.sdk.apiKey,
  secret: config.sdk.secretKey,
  baseUrl: config.sdk.baseUrl
};
const api = new InfinitoApi(opts);

module.exports = {
  getPlatformBalance: async ({ platform, tx_id, address }) => {
    let balance = null;
    try {
      switch (platform.toLowerCase()) {
        case 'iris':
        case 'ada':
        case 'atom':
          balance = await ibp.getAmountOfTransaction({ platform: platform, tx_id: tx_id, address: address });
          break;
        case 'one':
          balance = await one.getAmountOfTransaction({ tx_id: tx_id });
          break;
        case 'xtz':
          balance = await xtz.getAmountOfTransaction({ from_address: address });
          break;
        case 'ont':
          balance = await ont.getAmountOfTransaction({ tx_id: tx_id });
          break;
        default:
          logger.info('method of platform no found');
          balance = -1; // platform has not yet support.
          break;
      }
      logger.info('getPlatformBalance' + balance);
      return balance;
    }
    catch (err) {
      logger.error('api.getTransaction no found data with platform and tx_id' + platform + '/' + tx_id, err);
      throw err;
    }
  }
};
