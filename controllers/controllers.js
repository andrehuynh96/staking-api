const async = require("async");
const config = require("../config/config.js");
const Service = require("../services/services.js");
const TrxService = require("../services/trx.services");
const OntService = require("../services/ont.services");
const TomoService = require("../services/tomo.services");
const CosmosService = require("../services/cosmos.services");
const IrisService = require("../services/iris.services");
const TezosService = require("../services/tezos.services");
const Response = require("../libs/response.js");
const Message = require("./../libs/messages");

class Controller {

  /**
   * Creates an instance of Controller.
   * @memberof Controller
   */
  constructor() {
    this.service = new Service();
    this.trxService = new TrxService();
    this.ontService = new OntService();
    this.tomoService = new TomoService();
    this.cosmosService = new CosmosService();
    this.irisService = new IrisService();
    this.tezosService = new TezosService();
  }

  /**
   * getValidators
   *
   * @param {any} req
   * @param {any} res
   * @memberof Controller
   */
  getValidators(req, res) {
    let platform = req.params.platform;
    let offset = req.query.offset;
    let limit = req.query.limit;
    let name = req.query.name ? req.query.name : '';
    let jailed = req.query.jailed ? req.query.jailed : false;
    this.service.getValidators({ platform: platform, offset: offset, limit: limit, name: name, jailed: jailed }, (err, data) => {
      if (err) {
          return res.send(Response.fail(err));
      }

      return res.send(Response.ok(data));
    });
  }

  /**
   * Get Delegations
   *
   * @param {any} req
   * @param {any} res
   * @memberof Controller
   */
  getDelegations(req, res) {
    let platform = req.params.platform;
    let address  = req.params.addr;
    switch (platform) {
      case 'TRX':
        this.trxService.getDelegations(address, (err, data) => {
          if (err) {
              return res.send(Response.fail(err));
          }
  
          return res.send(Response.ok(data));
        });
        break;
      case 'ONT':
        this.ontService.getDelegations(address, (err, data) => {
          if (err) {
              return res.send(Response.fail(err));
          }
  
          return res.send(Response.ok(data));
        });
        break;
      case 'COSMOS':
          this.cosmosService.getDelegations(address, (err, data) => {
            if (err) {
                return res.send(Response.fail(err));
            }
    
            return res.send(Response.ok(data));
          });
        break;
      case 'IRIS':
          this.irisService.getDelegations(address, (err, data) => {
            if (err) {
                return res.send(err);
            }
    
            return res.send(Response.ok(data));
          });
        break;
      case 'TEZOS':
          this.tezosService.getDelegations(address, (err, data) => {
            if (err) {
                return res.send(Response.fail(err));
            }
    
            return res.send(Response.ok(data));
          });
        break;
      default:
        return res.send(Response.fail(new Error(`Unsupported platform ${params.platform}`)));
    }
  }

  /**
   * sendTransaction
   *
   * @param {any} req
   * @param {any} res
   * @memberof Controller
   */
  sendTransaction(req, res) {
    let params = req.body;
    let rawtx = params.rawtx;
    if (!rawtx)
      return res.send(Response.fail(Message.TRX_E100001));

    let sendTx = null;
    params.platform = req.params.platform;
    switch (params.platform) {
      case 'TRX':
        this.trxService.sendRawTx(params, (err, data) => {
          if (err) {
            return res.send(Response.fail(err));
          }
          return res.send(Response.ok(data));
        });
        break;
      case 'ONT':
        this.ontService.sendRawTx(params, (err, data) => {
          if (err) {
            return res.send(Response.fail(err));
          }
          return res.send(Response.ok(data));
        });
        break;
      case 'COSMOS':
          this.cosmosService.sendRawTx(params, (err, data) => {
            if (err) {
                return res.send(err);
            }
            return res.send(data);
          });
        break;
      case 'TOMO':
          this.tomoService.sendRawTx(params, (err, data) => {
            if (err) {
                return res.send(Response.fail(err));
            }
            return res.send(Response.ok(data));
          });
        break;
      case 'IRIS':
        this.irisService.sendRawTx(params, (err, data) => {
          if (err) {
              return res.send(err);
          }
          return res.send(data);
        });
        break;
      case 'TEZOS':
        this.tezosService.sendRawTx(params, (err, data) => {
          if (err) {
              return res.send(Response.fail(err));
          }
          return res.send(Response.ok(data));
        });
        break;
      default:
        return res.send(Response.fail(new Error(`Unsupported platform ${params.platform}`)));
    }

    /* params: {
      platform  : '',
      voter     : '',
      validator : '',
      amount    : 0129,
      action    : vote || unvote
      rawtx    : {} || ''
    }
    */
    /*sendTx(params, (err, data) => {
        if (err) {
            return res.send(Response.fail(err));
        }

        return res.send(Response.ok(data));
    });*/
  }

  everstakeGetOrders(req, res){
    let address = req.params.addr;
    let platform = req.params.platform;
    let offset = 0, limit = 50;

		if (req.query.offset) {
			offset = req.query.offset <= 0 ? 0 : parseInt(req.query.offset);
		}

		if (req.query.limit) {
			limit = req.query.limit <= 0 || req.query.limit > 50 ? 50 : parseInt(req.query.limit);
		}

    switch(platform) {
      case "COSMOS":
        this.cosmosService.everstakeGetOrders(address, offset, limit, (err, data) => {
          if (err) {
              return res.send(Response.fail(err));
          }
          return res.send(Response.ok(data));
        });
        break;
      
      default:
        return res.send(Response.fail(new Error(`Unsupported platform ${platform}`)));
    }
  }

  everstakeOrder(req, res){
    let delegator  = req.body.delegator;
    let validator  = req.body.validator;
    let platform   = req.body.platform;
    let amount     = req.body.amount;

    switch (platform) {
      case "COSMOS":
        this.cosmosService.everstakeOrder(delegator, validator, amount, (err, data) => {
          if (err) {
              return res.send(Response.fail(err));
          }
          return res.send(Response.ok(data));
        });
        break;

      default:
        return res.send(Response.fail(new Error(`Unsupported platform ${platform}`)));
    }
  }
}

module.exports = Controller;
