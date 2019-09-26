const async = require("async");
const config = require("../config/config.js");
const Service = require("../services/services.js");
const Response = require("../libs/response.js");

class Controller {

    /**
     * Creates an instance of Controller.
     * @memberof Controller
     */
    constructor() {
        this.service = new Service();
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
     * sendTransaction
     *
     * @param {any} req
     * @param {any} res
     * @memberof Controller
     */
    sendTransaction(req, res) {
        let params = req.body;
        let sendTx = null;
        params.platform = req.params.platform;
        switch (params.platform) {
          case 'TRX':
            sendTx = this.service.sendTrxTransaction;
            break;
          case 'ONT':
            sendTx = this.service.sendOntTransaction;
            break;
          case 'COSMOS':
            sendTx = this.service.sendCosmosTransaction;
            break;
          case 'TOMO':
            sendTx = this.service.sendTomoTransaction;
            break;
          default:
            return res.send(Response.fail(new Error(`Unsupported platform ${params.platform}`)));
            break;
        }

        /* params: {
          platform  : '',
          voter     : '',
          validator : '',
          amount    : 0129,
          raw_tx    : {} || ''
        }
        */
        sendTx(params, (err, data) => {
            if (err) {
                return res.send(Response.fail(err));
            }

            return res.send(Response.ok(data));
        });
    }

}

module.exports = Controller;
