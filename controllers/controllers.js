const async = require("async");
const config = require("../config/config.js");
const Service = require("../services/services.js");
const TrxService = require("../services/trx.services");
const OntService = require("../services/ont.services");
const TomoService = require("../services/tomo.services");
const CosmosService = require("../services/cosmos.services");
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
    this.service.getValidators({ platform: platform, offset: offset, limit: limit, name: name }, (err, data) => {
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
      // case 'TOMO':
      //     this.tomoService.getDelegations(params, (err, data) => {
      //       if (err) {
      //           return res.send(Response.fail(err));
      //       }
    
      //       return res.send(Response.ok(data));
      //     });
      //   break;
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

}

module.exports = Controller;
