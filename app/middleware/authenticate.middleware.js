const logger = require("app/lib/logger");
module.exports = (req, res, next) => {
  try {
    let user = req.headers["x-user"];
    req.user = JSON.parse(user);
  } catch (err) {
    logger.error("parse user info fail:", err);
    return res.unauthorized();
  }

  next();
};
