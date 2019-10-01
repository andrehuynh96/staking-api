const request = require("request");
const async = require("async");
const logger = require("./../libs/logger");
const Message = require("./../libs/messages");
const ValidatorModel = require("../models/Validator.js");
const config = require("./../config/config.js");

class Service {
    constructor() {
    }

    getValidators (params, cb) {
      let offset = 0, limit = 50, query = {};
      if (params.offset) {
          offset = parseInt(params.offset) || 0;
      }

      if (params.limit) {
          limit = params.limit == 0 || params.limit > 50 ? 50 : parseInt(params.limit);
      }

      query.platform = params.platform || '';
      if (params.name) {
        query.name   = { "$regex": params.name, "$options": "i" };
      }

      if (config.partnerOnly == true || config.partnerOnly == 'true') {
        query.partner = true;
      }

      async.parallel([
        function (cb) {
          ValidatorModel.find(query, { '_id': 0, '__v': 0 })
            .skip(offset)
            .limit(limit)
            .sort({ rank: 1 })
            .exec((err, tokens) => {
              if (err) {
                return cb(err)
              }

              return cb(null, tokens)
            })
        },
        function (cb) {
          ValidatorModel.count(query)
          .exec((err, total) => {
            if (err) {
              return cb(err)
            }

            return cb(null, total)
          })
        }
      ], (err, results) => {
        if (err) {
          return cb(err)
        }

        return cb(null, { total: results[1], from: offset, to: offset + results[0].length - 1, validators: results[0] });
      })
    }
}

module.exports = Service;
