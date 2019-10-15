const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const Message = require("./../libs/messages");
const config = require("./../config/config.js");
const cosmosjs   = require("@cosmostation/cosmosjs");
const ValidatorModel = require("../models/Validator.js");

class CosmosService {
	constructor() {
		var self = this;
		self.baseURL = config.cosmosRpc.insight;
		self.sendRawTransaction         = self.baseURL  + "/tx/send";
		self.getAddrDelegationsURL      = self.baseURL  + "/addr/{address}/delegations";
		self.getAddressRewardsURL       = self.baseURL  + "/addr/{address}/rewards";
		logger.info(`Connect to Insight:  COSMOS ${this.baseURL}`);
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
					let delegations = bodyJson.data;
					async.eachLimit(delegations, 5, function(delegation, callback){
						let query = {};
						query.address = { "$regex": delegation.validator_address, "$options": "i" };
						ValidatorModel.findOne(query, { '_id': 0, '__v': 0 })
							.sort({ rank: 1 })
							.lean()
							.exec((err, token) => {
								if (err) {
									return callback(err)
								}
								
								delegation.address = delegation.delegator_address;
								delegation.vote_amount = delegation.shares;
								
								delete delegation.delegator_address;
								delete delegation.validator_address;
								delete delegation.shares;

								result.push({validator: token,
											delegator: delegation})
								callback()
							})
					}, function(error) {
						if(error) {
							console.log('A request failed to process');
							return cb(err)
						} else {
							console.log('All request have been processed successfully');
							return cb(null, result);
						}
					});
				} else {
					return cb(null, result);
				}
			} catch (error) {
				logger.error(error);
				return cb(error, null);
			}
		});
	}


	sendRawTx(params, cb){
		var self = this;
		var url = self.sendRawTransaction;
		var rawtx = params.rawtx;
		var data = {
			"rawtx" : rawtx
		}
		logger.getLogger("rawtx").info("rawtx", "ATOM", rawtx);

		request.post({
			headers  : { 'content-type': 'application/json' },
			url      : url,
			body     : data,
			timeout  : 15000,
			json     : true
		}, (err, response, body) => {
			if(err){
				console.log(err.message);
				return cb(err, null);
			}

			if(response.statusCode != 200)  {
				return cb(new Error(`ATOM insight is unreachable, status code: ${response.statusCode}`), null);
			}
			console.log('body :', body);
			if (response.statusCode == 200) {
				if (body) {
					if (body.cd == 0) {
						let data = {
							tx_id: body.data.tx_id
						};
						return cb(null, data);
					} else {
						if(body.msg){
							cb({message: body.msg}, null);
						}
						return cb({message: body.data.message}, null);
					}
				}
			}
		});
	}
	
}

module.exports = CosmosService;
