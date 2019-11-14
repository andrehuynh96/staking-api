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
config.irisApi   = env.IRIS_VALIDATORS_API
config.schedule = env.SCHEDULE_SYNC || '*/5 * * * *'
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

config.trxRpc = {
  name : env.TRX_CONSUL_RPC_NAME || 'sv_fullnode_rpc_trx',
  insight: env.TRX_INSIGHT_DEFAULT || "127.0.0.1:3001",
  url  : env.TRX_RPC_DEFAULT || '127.0.0.1:3000',
}

config.tomoRpc = {
  name : env.TOMO_CONSUL_RPC_NAME || 'sv_fullnode_rpc_tomo',
  url  : env.TOMO_RPC_DEFAULT || '127.0.0.1:3000'
}

config.ontRpc = {
  name    : env.ONT_CONSUL_RPC_NAME || 'sv_fullnode_rpc_ont',
  insight : env.ONT_INSIGHT_DEFAULT || "127.0.0.1:3001",
  url     : env.ONT_RPC_DEFAULT || '127.0.0.1:3000',
}

config.cosmosRpc = {
  name    : env.COSMOS_CONSUL_RPC_NAME || 'sv_insight_rpc_cosmos',
  insight : env.COSMOS_INSIGHT_DEFAULT || "127.0.0.1:3001",
  url     : env.COSMOS_RPC_DEFAULT || '127.0.0.1:3000',
  chainId : env.COSMOS_CHAIN_ID || 'cosmoshub-2'
}

config.irisRpc = {
  name    : env.IRIS_CONSUL_RPC_NAME || 'sv_insight_rpc_iris',
  insight : env.IRIS_INSIGHT_DEFAULT || "127.0.0.1:3001",
  url     : env.IRIS_RPC_DEFAULT || '127.0.0.1:3000',
  chainId : env.IRIS_CHAIN_ID || 'irishub'
}

config.tezosRpc = {
  name    : env.TEZOS_CONSUL_RPC_NAME || 'sv_insight_rpc_tezos',
  insight : env.TEZOS_INSIGHT_DEFAULT || '127.0.0.1:3001',
  url     : env.TEZOS_RPC_DEFAULT || '127.0.0.1:3000'
}

config.everstakeUrl = env.EVERSTAKE_URL

module.exports = config;
