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
config.trxApi    = env.TRX_API
config.tomoApi   = env.TOMO_API
config.ontApi    = env.ONT_API
config.cosmosApi = env.COSMOS_API
config.consul    = {
  enable            : env.CONSUL_ENABLE,
  host              : env.CONSUL_HOST || '127.0.0.1',
  port              : env.CONSUL_PORT || 8500,
  token             : env.CONSUL_TOKEN || '',
  nodeIp            : env.CONSUL_NODE_IP,
  insight           : env.CONSUL_INSIGHT_NAME || 'sv_insight_xlm',
  insightInterval   : env.CONSUL_INSIGHT_INTERVAL || '2s',
  insightDeregister : env.CONSUL_INSIGHT_DEREGISTER || '10s',
  monitorHost       : env.CONSUL_MONITOR_HOST,
  monitorPort       : env.CONSUL_MONITOR_PORT
}

module.exports = config;
