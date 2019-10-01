const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const Message = require("./../libs/messages");
const config = require("./../config/config.js");
const Utils = require("../libs/utils")

class TrxService {
  constructor() {
    var self = this;
    this.rpcUrl = config.trxRpc.url;
    this.sendRawEndPoints = [];
    
    logger.info(`RPC url: ${config.trxRpc.url}`)
    
    if (config.sendRawEndPoints && config.sendRawEndPoints.length > 0) {
      this.sendRawEndPoints = config.sendRawEndPoints.split(",");
    }

    let isConsuleEnable = parseInt(config.consul.enable) === 1 ? true : false
    if (isConsuleEnable) {
      watch(config.trxRpc.name, (err, nodes) => {
        if (err) {
          return logger.error(`Watch consul's nodes change failed: ${err.message}`)
        }

        nodes.forEach(node => {
          this.sendRawEndPoints.push(`http://${node.ServiceAddress}:${node.ServicePort}`)
        })
      })
    } else {
      this.sendRawEndPoints.push(this.rpcUrl);
      logger.info(`RPC url: ${this.sendRawEndPoints}`)
    }
  }

  sendRawTx(params, cb) {
    logger.info(`RPC url: ${this.sendRawEndPoints}`)
    let rawtx = params.rawtx;
    let trx_id = {};
    let error  = null;
    if(rawtx.raw_data && rawtx.raw_data.expiration <=  rawtx.raw_data.timestamp){
      error = Message.TRX_E100002
      logger.error("Wrong format raw input, code: ", error.code)
      return cb(error);
    }
    async.each(this.sendRawEndPoints, (endPoint, callback) => {
      logger.info(`Sending to ${endPoint}`)
      request.post({
        headers   : { 'Content-Type': 'application/x-www-form-urlencoded' },
        url       : endPoint + "/wallet/broadcasttransaction",
        body      : JSON.stringify(rawtx),
        timeout   : 15000,
        json      : true
      }, (err, response, body) => {
        if (err) {
          logger.error(`Make push_transaction request to ${endPoint} failed: ${err.message}`)
          if (!error) {
            error = Message.TRX_E100003
          }

          return callback();
        }

        console.log("BODY = ", body);

        if (response.statusCode == 200 && !body.code){
          // if one of requests return success, return immediately
          trx_id = rawtx.txID;
          return callback(new Error("Success"))
        } else if (body.code != undefined){
          if (!error) {
            error = {
              code   : body.code
            }
          }
          let message = '';
          if(body.message){
            message = Utils.hex_to_ascii(body.message);
            error.message = message;
          }
          return callback();
        }
        
        // because we call many requests, so only return error if all of them was failed
        if (response.statusCode != 200) {
          // error code from fullnode is highest priority
          if (!error) {
            error = Message.TRX_E100004
          }

          logger.error(`Send raw to ${endPoint} failed, code: `, response.statusCode)
          return callback();
        }
      })
    }, (err) => {
      // if any of the request processing produced an error, that mean one of them has success
      if (err) {
        return cb(null, {
          tx_id: trx_id
        })
      }

      return cb(error)
    });
  }


}

module.exports = TrxService;
