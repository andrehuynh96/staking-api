const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const Message = require("./../libs/messages");
const config = require("./../config/config.js");

class TomoService {
  constructor() {
    var self = this;
    this.rpcUrl = config.tomoRpc.url;
    this.sendRawEndPoints = [];
    
    logger.info(`RPC url: ${config.tomoRpc.url}`)
    
    if (config.sendRawEndPoints && config.sendRawEndPoints.length > 0) {
      this.sendRawEndPoints = config.sendRawEndPoints.split(",");
    }

    // let isConsuleEnable = parseInt(config.consul.enable) === 1 ? true : false
    // if (isConsuleEnable) {
    //   watch(config.tomoRpc.name, (err, nodes) => {
    //     if (err) {
    //       return logger.error(`Watch consul's nodes change failed: ${err.message}`)
    //     }

    //     nodes.forEach(node => {
    //       this.sendRawEndPoints.push(`http://${node.ServiceAddress}:${node.ServicePort}`)
    //     })
    //   })
    // } else {
      this.sendRawEndPoints.push(this.rpcUrl);
    // }
  }

/********************************** SUCCESS ********************************************************/
//         body =  { jsonrpc: '2.0',
//                   id: 1,
//                   result: '0xfca9db4b941c1f840ff7348bd032d4ecbebed369cacf8bd050a7c97e2b58b6f6' }

/********************************** FAILED  ********************************************************/
//         body =  { jsonrpc: '2.0',
//                   id: 1,
//                   error: 
//                      { code: -32000,
//                        message: 'insufficient funds for gas * price + value' } }

  async sendRawTx(params, cb) {
    let self = this;
    try {
        let options = {
            method: 'POST',
            url: this.rpcUrl,
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                jsonrpc: '2.0',
                method: 'eth_sendRawTransaction',
                params: [ '0x' + params.rawtx ],
                id: 1
            },
            json: true
        };

        let body = await this.send(options);
        console.log("body = ", body);

        if(body.error) {
          logger.error(`Send raw to ${self.rpcUrl} failed, msg: `, body.error);
          return cb(new Error(body.error.message), null);
        }

        if(body.result){
          return cb(null, {tx_id: body.result});
        }

        return body;
    } catch (err) {
        logger.error("error in sendRawTransaction: ", err);
        return err;
    }
  }

  send(options) {
      return new Promise(function(resolve, reject) {
          request(options, (error, response, body) => {
              if (error) {
                  return reject(error);
              } else {
                  resolve(body);
              }
          })
      })
  }
}

module.exports = TomoService;
