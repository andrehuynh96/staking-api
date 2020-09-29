const crypto = require('crypto');
const logger = require("app/lib/logger");
const ClientKey = require("app/model").partner_api_keys;
const Redis = require("app/lib/redis").client();
const RedisResourse = require("app/resource/redis");

module.exports = async (req, res, next) => {
  try {
    const signature = req.get('x-signature');
    const time = req.get('x-time');
    let apiKey;
    if (req.user && req.user.api_key) {
      apiKey = req.user.api_key;
    }
    else {
      apiKey = req.body.api_key;
    }

    if (!signature || !time) {
      return res.badRequest(res.__("NOT_FOUND"), "NOT_FOUND", { fields: ['x-time', 'x-signature'] });
    }

    let key = await _getKey(apiKey);
    const content = `${key.secret_key}
${req.method.toUpperCase()}
${req.originalUrl}
${JSON.stringify(req.body)}
${time}`;

    const hash = crypto
      .createHash('sha256')
      .update(content)
      .digest('hex');

    console.log('content', content);
    console.log('hash', hash);
    console.log('signature', signature);
    if (hash != signature) {
      return res.badRequest(res.__("WRONG_CHECKSUM"), "WRONG_CHECKSUM");
    }
    next();
  }
  catch (err) {
    logger.error("verify signature fail:", err);
    return res.badRequest(err.message);
  }
}

async function _getKey(apiKey) {
  let cacheKey = RedisResourse.clientKey.withParams(apiKey);
  let cacheData = await Redis.getAsync(cacheKey);
  if (cacheData) {
    return JSON.parse(cacheData);
  }

  let key = await ClientKey.findOne({
    where: {
      api_key: apiKey,
      actived_flg: true
    }
  });

  if (key) {
    Redis.setAsync(cacheKey, JSON.stringify(key), "EX", 3600);
    return key;
  }
  else {
    throw new Error("Not found API Key");
  }
}