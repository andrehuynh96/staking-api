const express = require("express");
const controller = require("./authentication.controller");
const requestSchema = require("./authentication.request-schema");
const validator = require("app/middleware/validator.middleware");
const verifySignature = require("app/middleware/verify-signature.middleware");
const route = express.Router();

route.post("/accounts/authentication",
  validator(requestSchema),
  controller
)

module.exports = route;  