const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const Message = require("./../libs/messages");
const config = require("./../config/config.js");

class OntService {
  constructor() {
    var self = this;
    this.rpcUrl = config.ontRpc.url;
    this.sendRawEndPoints = [];
    
    logger.info(`RPC url: ${config.ontRpc.url}`)
    
    if (config.sendRawEndPoints && config.sendRawEndPoints.length > 0) {
      this.sendRawEndPoints = config.sendRawEndPoints.split(",");
    }

    let isConsuleEnable = parseInt(config.consul.enable) === 1 ? true : false
    if (isConsuleEnable) {
      watch(config.ontRpc.name, (err, nodes) => {
        if (err) {
          return logger.error(`Watch consul's nodes change failed: ${err.message}`)
        }

        nodes.forEach(node => {
          this.sendRawEndPoints.push(`http://${node.ServiceAddress}:${node.ServicePort}`)
        })
      })
    } else {
      this.sendRawEndPoints.push(this.rpcUrl);
    }
  }

  /**
     * To send raw transaction to blockchian
     * @param hexData Hex encoded data
     * @param preExec Decides if it is a pre-execute transaction
     * @param userId  User's id
     */
    sendRawTx(params, cb){
      var body = {
          Action: 'sendrawtransaction',
          Version: 'v1.0.0',
          Data: params.rawtx
      };
      console.log("\sendRawEndPoints: \n", this.sendRawEndPoints);

      let result = {}
      let error  = null

      async.each(this.sendRawEndPoints, function (endPoint, callback) {
        logger.info(`\nPush raw to: ${endPoint} done.`);
          request.post({
              headers: {'content-type': 'application/x-www-form-urlencoded'},
              url: endPoint + '/api/v1/transaction',
              body: JSON.stringify(body),
              timeout: 15000,
              json: true
          }, (err, response, body) => {
              if(err){
                logger.error(`Make push_transaction request to ${endPoint} failed: ${err.message}`);
                  error = Message.E00015;
                  return callback();
              }

              console.log("body = ", body)

              if (!body.Error) {
                  // if one of requests return success, return immediately
                  result = body.Result;
                  return callback(new Error("Success"));
              }

              // because we call many request, so only return error if all of them was failed
              if (body.Error) {
                logger.error(`Send raw to ${endPoint} failed: `, body.Result);
                  let bodySplit = body.Result.split("!:"); 
                  error = bodySplit[bodySplit.length - 1];
                  return callback();
              }
          });
      }, (err) => {
          // if any of the request processing produced an error, that mean one of them has success
          if (err) {
              return cb(null, result)
          }

          return cb({message: error}, null)
      });
  }
}

module.exports = OntService;
