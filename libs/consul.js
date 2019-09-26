const Consul = require('consul');
const async  = require('async');
const crypto  = require('crypto');
const config = require('../config/config.js');
const Logger = require("./logger.js");

let consul = new Consul({
    host: config.consul.host,
    port: config.consul.port,
    defaults: {
        token: config.consul.token
    }
})

let insightAddr = config.consul.nodeIp
let insightPort = parseInt(config.port)

let fullnodeHost = config.consul.nodeIp
let fullnodeRpcPort = parseInt(config.consul.rpcPort)
let fullnodeSocketPort = parseInt(config.consul.socketPort)

let insightId = crypto.createHash('md5').update(`${config.consul.insight}:${insightAddr}:${insightPort}`).digest("hex")
let rpcId = crypto.createHash('md5').update(`${config.consul.rpc}:${fullnodeHost}:${fullnodeRpcPort}`).digest("hex")
let socketId = crypto.createHash('md5').update(`${config.consul.socket}:${fullnodeHost}:${fullnodeSocketPort}`).digest("hex")

let tags = [`{"insight": "${insightId}", "rpc": "${rpcId}", "socket": "${socketId}" }`]

let services = [{
    name      : config.consul.insight,
    address   : insightAddr,
    port      : insightPort,
    id        : insightId,
    check     : {
        tcp     : `${insightAddr}:${insightPort}`,
        interval: config.consul.insightInterval || '2s',
        deregister_critical_service_after: config.consul.insightDeregister || '10s'
    },
    tags      : tags
}, {
    name      : config.consul.rpc,
    address   : fullnodeHost,
    port      : fullnodeRpcPort,
    id        : rpcId,
    check     : {
        tcp     : `${fullnodeHost}:${fullnodeRpcPort}`,
        interval: config.consul.rpcInterval || '2s',
        deregister_critical_service_after: config.consul.rpcDeregister || '10s'
    },
    tags      : tags
}, {
    name      : config.consul.socket,
    address   : fullnodeHost,
    port      : fullnodeSocketPort,
    id        : socketId,
    check     : {
        tcp     : `${fullnodeHost}:${fullnodeSocketPort}`,
        interval: config.consul.socketInterval || '2s',
        deregister_critical_service_after: config.consul.socketDeregister || '10s'
    },
    tags      : tags
}]

function deregisterService (service, callback) {
    consul.agent.service.deregister({ id: service.id }, (err) => {
        if (err) {
            Logger.error(`De-Registering consul service ${service.id} failed: ${err.message}`)
            return callback(err)
        }

        return callback(null)
    });
}

exports.register = () => {
    return new Promise((resolve, reject) => {
        // assuming openFiles is an array of file names
        async.each(services, (service, callback) => {
            if (isNaN(service.port) || service.port <= 0) {
              return
            }

            consul.agent.service.register(service, err => {
                if (err) {
                    Logger.error(`Register consul service failed: ${err.message}`)
                    return callback(err)
                }

                if (service.check.ttl) {
                    setInterval(() => {
                        consul.agent.check.pass({
                            id  : `service:${service.id}`,
                            note: `Notes`
                        }, err => {
                            if (err) {
                                return Logger.error(`Health check failed: ${err.message}`)
                            }
                        });
                    }, parseInt(service.check.ttl) * 1000);
                }

                return callback(null)
            });
        }, (err) => {
            if (err) {
                return reject(err)
            }

            return resolve(null)
        });
    })
}

exports.deregister = () => {
    return new Promise((resolve, reject) => {
        // assuming openFiles is an array of file names
        async.each(services, (service, callback) => {
            deregisterService(service, (err) => {
                return callback(null)
            })
        }, (err) => {
            return resolve(null)
        });
    })
}

exports.deregisterRequest = () => {
    return new Promise((resolve, reject) => {
        request.post({
          headers: { 'Content-Type': 'application/json' },
          url: `http://${config.consul.monitorHost}:${config.consul.monitorPort}/insight/deregister`,
          body: services[0],
          json: true
        }, (err, response, body) => {
            if (err) {
              Logger.error(`Request deregister services failed: ${err.message}`)
            }

            return resolve()
        });
    })
}

exports.watch = (service, callback) => {
    let watch = consul.watch({ method: consul.catalog.service.nodes, options: { service: service } });
    watch.on('change', function(data, res) {
      callback(null, data);
    });

    watch.on('error', function(err) {
      callback(err);
    });
}
