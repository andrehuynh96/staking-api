/*eslint no-process-env: "off"*/
const config = require('app/config');
const axios = require('axios');
const format = require('string-template');

const insightApi = {
  init: () => {
    let insight = config.insight;
    let coins = [];
    Object.keys(insight).forEach(coin => {
      coins[coin] = insightApi._generateMethods(
        insight[coin].server,
        insight[coin].api,
        coin
      );
    });
    return coins;
  },

  _generateMethods: (baseUrl, apis, coin) => {
    let obj = {};
    apis.forEach(api => {
      obj[api.name] = insightApi._buildFunction(baseUrl, api);
    });

    return obj;
  },

  _buildFunction: (baseUrl, api) => {
    let headers = {
      'Content-Type': 'application/json',
      'x-user': '{}',
    };
    var func = async (...args) => {
      try {
        let url = baseUrl + insightApi._formatPath(api, args);
        let data = insightApi._extractData(api, args);

        if (api.method.toUpperCase() == 'GET') {
          let result = await axios({
            url,
            method: api.method,
            headers: headers,
          });
          return result.data;
        }
        let result = await axios({
          url,
          method: api.method,
          headers: headers,
          data: data,
        });
        return result.data;
      } catch (err) {
        if (config.logDebug) {
          console.log('Insight _buildFunction', err);
        }
        throw err;
      }
    };
    return func;
  },

  _formatPath(api, args) {
    if (args && args.length > 0) {
      let params = {};
      if (api.params && api.params.length > 0) {
        for (let index = 0; index < api.params.length; index++) {
          let key = api.params[index];
          params[key] = args[index] != undefined ? args[index] : null;
        }
      }
      return format(api.url, params);
    }
    return api.url;
  },

  _extractData(api, args) {
    let paramLen = api.params ? api.params.length : 0;
    let data = args.length > paramLen ? args[paramLen] : {};
    return data;
  },
};

module.exports = {
  ...insightApi.init(),
};
