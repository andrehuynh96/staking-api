const mung = require('express-mung');
const request = require('request');
const config = require('../config/config');
const Constants = require('../config/constants');
/* Remove any classified information from the response. */
function redact(body, req, res) {
  if ((res.statusCode != 200 || (body.cd && body.cd != 0)) && config.tracking.enable) {
    let options = {
      uri: config.tracking.url,
      method: "POST",
      json: {
        name: config.appName,
        level: 'ERROR',
        message: "LOGS",
        version: Constants.VERSION,
        meta_logger: null,
        ip: global.local_ip,
        timestamp: new Date(),
        err: body,
        env: "dev",
        originalUrl: req.originalUrl,
        route_path: req.route.path
      }
    };

    request(options, function (err, response, body) {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  return body;
}

module.exports = {
  tracker: mung.json(redact, { mungError: true })
}
