const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const Message = require("./../libs/messages");
const config = require("./../config/config.js");
const cosmosjs   = require("@cosmostation/cosmosjs");

class CosmosService {
  constructor() {
    var self = this;
    this.rpcUrl = config.cosmosRpc.url;
    this.chainId = config.cosmosRpc.chainId;
    this.cosmos = cosmosjs.network(this.rpcUrl, this.chainId);
    this.sendRawEndPoints = [];
    
    logger.info(`RPC url: ${config.cosmosRpc.url}`)
    
    if (config.sendRawEndPoints && config.sendRawEndPoints.length > 0) {
      this.sendRawEndPoints = config.sendRawEndPoints.split(",");
    }

    // let isConsuleEnable = parseInt(config.consul.enable) === 1 ? true : false
    // if (isConsuleEnable) {
    //   watch(config.cosmosRpc.name, (err, nodes) => {
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

  sendRawTx(params, cb) {
    var self = this;
    self.cosmos.broadcast(params.rawtx).then(response => {
      if(response.error){
        logger.error(`Send raw to ${self.rpcUrl} failed, msg: `, response.error);
        return cb(new Error(response.error), null)
      }
      return cb(null, {
        tx_id: response.txhash
      })
    });
  }
  
}

module.exports = CosmosService;
