const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const ValidatorModel = require("../models/Validator.js");
const config = require("./../config/config.js");

class SyncValidators {
  constructor() {
  }

  getTrxWitness () {
    logger.info(`Processing trx witness`);
    let options = { method: 'GET',
      url     : config.trxApi,
      json    : true,
      headers : {
         'cache-control': 'no-cache',
         'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
         Origin: 'https://tronscan.org',
         Referer: 'https://tronscan.org/',
         Accept: 'application/json, text/plain, */*' } };

    request(options, (error, response, body) => {
      if (error) {
        return logger.error(`Get trx witness failed: ${error.message}`)
      };

      logger.info(`Saving ${body.length} trx witness`);
      if (body[1].votes > body[0].votes) {
        logger.error(`Tron scan should return witness in asc order of votes but it not.`)
      }

      body.forEach((witness, i) => {
        if (!witness.votes || !witness.address) {
          return
        }

        // tronscan return in order
        ValidatorModel.findOneAndUpdate({
          address         : witness.address
        }, {
          $setOnInsert    : {
            partner       : false
          },
          name            : witness.name || '',
          website         : witness.url || '',
          rank            : i+1,
          address         : witness.address,
          public_key      : '',
          platform        : 'TRX',
          votes           : witness.votes || 0,
          commission      : 0,
        }, { upsert: true }, (err, res) => {
          if (err) {
            return logger.error(`Failed to insert/update trx witness: ${err.message}`)
          }
        })
      })
    })
  }

  getTomoNodes () {
    let page = 1, results = [], total = 1, processed = 0;
    async.until(function test(cb) {
      cb(null, processed >= total);
    }, function iter(next) {
      logger.info(`Processing tomochain page ${page}`);
      let options = {
        method  : 'GET',
        url     : config.tomoApi,
        qs      : { page: page++ },
        json    : true
      };

      request(options, (error, response, body) => {
        if (error) {
          return next(error);
        }

        processed += body.items.length;
        total = body.total;
        results = results.concat(body.items);
        return next();
      });
    }, function done (err) {
      if (err) {
        return logger.error(`Get tomochain master nodes error: ${err.message}`)
      }

      logger.info(`Saving ${results.length} tomo masternodes`);
      results.forEach((node, i) => {
        if (!node.candidate || !node.name || !node.isMasternode) {
          return
        }

        ValidatorModel.findOneAndUpdate({
          address         : node.candidate
        }, {
          $setOnInsert    : {
            partner       : false
          },
          name            : node.name || '',
          website         : node.socials ? node.socials.website || '' : '',
          rank            : node.rank,
          address         : node.candidate,
          public_key      : '',
          platform        : 'TOMO',
          votes           : node.capacity || 0,
          commission      : 0,
        }, { upsert: true }, (err, res) => {
          if (err) {
            return logger.error(`Failed to insert/update tomo master node: ${err.message}`)
          }
        })
      })
    })
  }

  getOntNodes () {
    let options = {
      method  : 'GET',
      url     : config.ontApi,
      json    : true
    };

    request(options, (err, response, body) => {
      if (err) {
        return logger.error(`Get ont consensus nodes failed: ${err.message}`)
      }

      if (body.code != 0 || !body.result || body.result.length <= 0) {
        return logger.error(`Invalid ont nodes response: ${body.msg}`)
      }


      logger.info(`Saving ${body.result.length} trx witness`);
      body.result.forEach((node, i) => {
        if (!node.name || !node.address || !node.public_key) {
          return
        }

        // tronscan return in order
        ValidatorModel.findOneAndUpdate({
          address         : node.address
        }, {
          $setOnInsert    : {
            partner       : false
          },
          name            : node.name || '',
          website         : node.detail_url || '',
          rank            : node.node_rank,
          address         : node.address,
          public_key      : node.public_key,
          platform        : 'ONT',
          votes           : node.current_stake || 0,
          commission      : node.node_proportion,
        }, { upsert: true }, (err, res) => {
          if (err) {
            return logger.error(`Failed to insert/update trx witness: ${err.message}`)
          }
        })
      })
    });
  }

  getCosmosValidators () {
    let options = {
      method  : 'GET',
      url     : config.cosmosApi,
      json    : true
    };

    request(options, (err, response, body) => {
      if (err) {
        return logger.error(`Get cosmos validators failed: ${err.message}`)
      }

      if (!body || body.length <= 0) {
        return logger.error(`Invalid cosmos validators response: ${body}`)
      }


      logger.info(`Saving ${body.length} cosmos validators`);
      body.sort(function(a, b) {
        return parseInt(b.tokens) - parseInt(a.tokens);
      });

      body.forEach((node, i) => {
        if (!node.description || !node.description.moniker || !node.operator_address || !node.commission) {
          return
        }

        // tronscan return in order
        ValidatorModel.findOneAndUpdate({
          address         : node.operator_address
        }, {
          $setOnInsert    : {
            partner       : false
          },
          name            : node.description.moniker || '',
          website         : node.description.website || '',
          rank            : i+1,
          address         : node.operator_address,
          public_key      : node.consensus_pubkey,
          platform        : 'COSMOS',
          votes           : node.tokens || 0,
          commission      : node.commission.rate ? parseFloat(node.commission.rate)*100 + "%" : '0%',
        }, { upsert: true }, (err, res) => {
          if (err) {
            return logger.error(`Failed to insert/update cosmos validators: ${err.message}`)
          }
        })
      })
    });
  }

  start () {
    this.getTrxWitness();
    this.getOntNodes();
    this.getTomoNodes();
    this.getCosmosValidators();
  }
}

module.exports = SyncValidators;
