const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const Message = require("./../libs/messages");
const config = require("./../config/config.js");
const Utils = require("../libs/utils");
const ValidatorModel = require("../models/Validator.js");

class TrxService {
	constructor() {
		var self = this;
		self.baseURL = config.trxRpc.insight;
		self.sendRawTransaction         = self.baseURL  + "/tx/send";
		self.getAddrDelegationsURL      = self.baseURL  + "/addr/{address}/delegations";
		self.getAddressRewardsURL       = self.baseURL  + "/addr/{address}/rewards";
		logger.info(`Connect to Insight:  TRX ${this.baseURL}`);
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
				console.log('bodyJson :', bodyJson);
				if (bodyJson.cd != 0) {
					// do not process data if cd != 0 ~ error
					return cb(bodyJson, null);
				}
				let result = []
				if(bodyJson.data.votes && bodyJson.data.votes.length > 0){
					let delegations = bodyJson.data.votes;
					async.eachLimit(delegations, 5, function(delegation, callback){
						let query = {};
						query.address = { "$regex": delegation.vote_address, "$options": "i" };
						ValidatorModel.findOne(query, { '_id': 0, '__v': 0 })
							.sort({ rank: 1 })
							.lean()
							.exec((err, token) => {
								if (err) {
									return callback(err)
								}

								result.push({validator: token,
											delegator: {
											address: address,
											vote_amount: delegation.vote_count
										}})
								callback();
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

	sendRawTx(params, cb) {
		var self = this;
		var url = self.sendRawTransaction;
		var rawtx = params.rawtx;
		var data = {
            "rawtx" : rawtx
        }
		logger.getLogger("rawtx").info("rawtx", "TRX", rawtx);

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
				return cb(new Error(`TRX insight is unreachable, status code: ${response.statusCode}`), null);
			}

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
						return cb({message: body.data.code}, null);
					}
				}
			}
		});
	}
}

module.exports = TrxService;
