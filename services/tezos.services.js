const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const Message = require("./../libs/messages");
const config = require("./../config/config.js");
const Utils = require("../libs/utils");
const ValidatorModel = require("../models/Validator.js");

class TezosService {
    constructor() {
        var self = this;
        self.baseURL = config.tezosRpc.insight;
        self.sendRawTransaction = self.baseURL + "/tx/send";
        logger.info(`Connect to Insight:  TEZOS ${this.baseURL}`);
    }

    sendRawTx(params, cb) {
        var self = this;
        var url = self.sendRawTransaction;
        var rawtx = params.rawtx;
        var data = {
            "rawtx" : rawtx
        }
        logger.getLogger("rawtx").info("rawtx", "TEZOS", rawtx);

        request.post({
            url      : url,
            form     : data,
            timeout  : 15000
        }, (err, response, body) => {
            if (err) {
                console.log(err.message);
                return cb(err, null);
            }
            let result = JSON.parse(body);
            if (result && result.data && result.data.operation_hash) {
                let data = {
                    tx_id: result.data.operation_hash
                };
                return cb(null, data);
            } else if (result && result.data && result.data.error) {
                return cb({message: result.data.error}, null);
            } else {
                return cb(new Error(`TEZOS insight is unreachable, status code: ${response.statusCode}`), null);
            }
        });
    }
}

module.exports = TezosService;
