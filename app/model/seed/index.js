const config = require("app/config");

if (config.enableSeed) {
  require("./cosmos-config");
  require("./iris-config");
  require("./partner");
  require("./partner-api-key");
  require("./partner-tx-meno");
  require("./staking-platform");
}