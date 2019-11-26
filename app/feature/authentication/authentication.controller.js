const config = require("app/config");
const logger = require("app/lib/logger");
const Client = require("app/model").clients;
const ClientKey = require("app/model").client_keys;
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let key = await ClientKey.findOne({
      where: {
        client_key: req.body.api_key,
        client_secret: req.body.secret_key,
        active_flg: true
      }
    });

    if (!key) {
      return res.badRequest(res.__("NOT_FOUND_API_KEY"), "NOT_FOUND_API_KEY");
    }

    let client = await Client.findOne({
      where: {
        id: key.client_id,
      }
    });
    if (!client) {
      return res.badRequest(res.__("NOT_FOUND_CLIENT"), "NOT_FOUND_CLIENT");
    }
    if (!client.active_flg) {
      return res.forbidden(res.__("CLIENT_NOT_INACTIVE"), "CLIENT_NOT_INACTIVE");
    }

    var payload = {
      client_id: client.id,
      api_key: key.client_key
    };
    let token = jwt.sign(payload, config.jwt.private, config.jwt.options);
    return res.ok({
      access_token: token,
      token_type: 'Bearer',
      expires_in: config.jwt.options.expiresIn
    });

  }
  catch (err) {
    logger.error("Authentication fail:", err);
    next(err);
  }
}