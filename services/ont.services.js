const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const Message = require("./../libs/messages");
const config = require("./../config/config.js");
const ValidatorModel = require("../models/Validator.js");

class OntService {
	constructor() {
		var self = this;
		self.baseURL = config.ontRpc.insight;
		self.rpcURL = config.ontRpc.url;
		self.sendRawTransaction         = self.baseURL  + "/tx/send";
		self.getAddrDelegationsURL      = self.baseURL  + "/addr/{address}/delegations";
		self.getAddressRewardsURL       = self.baseURL  + "/addr/{address}/rewards";
		logger.info(`Connect to Insight:  ONT ${this.baseURL}`);
	}

	getDelegations(address, cb){
		var self = this;
		var url = self.getAddrDelegationsURL;
		url = url.replace("{address}", address);
		request(url, function (err, response, body){
			try {
				//have error
				if (response.statusCode !== 200) {
					return cb(body, null);
				}

				var bodyJson = JSON.parse(body);
				if (bodyJson.cd != 0) {
					// do not process data if cd != 0 ~ error
					return cb(bodyJson, null);
				}
				let result = []
				if(bodyJson.data && bodyJson.data.length > 0){
					result = bodyJson.data;
				}
				return cb(null, result);
			} catch (error) {
				logger.error(error);
				return cb(error, null);
			}
		});
	}

	/**
   * To send raw transaction to blockchian
   * @param hexData Hex encoded data
   * @param preExec Decides if it is a pre-execute transaction
   * @param userId  User's id
   */
	sendRawTx(params, cb){
		var self = this;
		var rawtx = params.rawtx;
		var url = self.sendRawTransaction;
		logger.getLogger("rawtx").info("rawtx", "ONT", rawtx);

		request.post({ url: url, form: { hexData: rawtx } }, function (err, response, body) {
			if (err) {
				return cb(err, null);
			}
			
			if (response.statusCode == 200) {
				body = JSON.parse(body);
				console.log('body :', body);
				if (body) {
					if (body.cd == 0) {
						let data = {
							tx_id: body.data
						};
						return cb(null, data);
					} else {
						return cb({message: body.msg}, null);
					}
				}
			}
			return cb(response.statusCode, null);
		});
	}
}

module.exports = OntService;
