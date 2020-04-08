const express = require("express");
const controller = require("./partner-commission.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();

route.get("/partners/commissions/:platform",
  authenticate,
  controller.getAll
);

route.get("/partners/:id/commissions/:platform",
  authenticate,
  controller.get
);

module.exports = route;