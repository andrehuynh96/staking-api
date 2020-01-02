const express = require("express");
const controller = require("./erc20.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();

route.get("/erc20/plans",
  authenticate,
  controller.getAllPlans
);

module.exports = route;