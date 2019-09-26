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
     * get balance
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
        this.service.getValidators({ platform: platform, offset: offset, limit: limit }, (err, data) => {
            if (err) {
                return res.send(Response.fail(err));
            }

            return res.send(Response.ok(data));
        });
    }

}

module.exports = Controller;
