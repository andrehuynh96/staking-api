require("dotenv").config();

const config = {};
const env = process.env;
config.mail       = {
    auth        : {
        user    : env.MAIL_AUTH_USER || "no-reply@infinitowallet.io",
        pass    : env.MAIL_AUTH_PASS || "YSja*m6ex&AISElu!Tb6",
        pass    : env.MAIL_RECIPIENTS || "iblcore-dev@blockchainlabs.asia",
        subject : env.MAIL_SUBJECT || "INFINITO-STAKING-API",
        recipients : env.MAIL_RECIPIENTS || "iblcore-dev@blockchainlabs.asia",
    }
}

config.logger     = {
  console       : {
    enable      : true,
    level       : env.CONSOLE_LOG_LEVEL || 'debug'
  },
  file          : {
    compress    : false,
    app         : 'logs/consul_app.log',
    error       : 'logs/consul_error.log',
    access      : 'logs/consul_access.log',
    format      : '.yyyy-MM-dd',
    level       : env.FILE_LOG_LEVEL || 'info'
  },
  appenders     : [
    'CONSOLE',
    'FILE',
    'ERROR_ONLY',
    'EMAIL_ERROR',
    'HTTPLOG_LEVEL'
  ]
}

config.appName   = env.APP_NAME || "infinito-staking-api"
config.tracking  = {
  enable        : true,
  url           : env.TRACKING_URL || "http://172.105.236.208:6969/api/logs"
}

config.mongo = {
  user  : env.MONGO_USER,
  pass  : env.MONGO_PASS,
  host  : env.MONGO_HOST || '127.0.0.1',
  port  : env.MONGO_PORT || 27017,
  dbname: env.MONGO_DB   || 'staking_api'
}

config.partnerOnly = env.PARTNER_ONLY;
config.port      = env.PORT
config.trxApi    = env.TRX_WITNESS_API || 'https://apilist.tronscan.org/api/witness'
config.tomoApi   = env.TOMO_CANDIDATES_API || 'https://master.tomochain.com/api/candidates'
config.ontApi    = env.ONT_NODES_API || 'https://explorer.ont.io/v2/nodes/current-stakes'
config.cosmosApi = env.COSMOS_VALIDATORS_API
config.consul    = {
  enable            : env.CONSUL_ENABLE,
  host              : env.CONSUL_HOST || '127.0.0.1',
  port              : env.CONSUL_PORT || 8500,
  token             : env.CONSUL_TOKEN || '',
  nodeIp            : env.CONSUL_NODE_IP,
  name              : env.CONSUL_INSIGHT_NAME || 'sv_staking_api',
  interval          : env.CONSUL_INTERVAL || '2s',
  deregister        : env.CONSUL_DEREGISTER || '10s',
}

module.exports = config;
