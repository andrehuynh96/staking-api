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

let ip = config.consul.nodeIp
let port = parseInt(config.port)
let id = crypto.createHash('md5').update(`${config.consul.name}:${ip}:${port}`).digest("hex")
let tags = [`{"id": "${id}"}`]

let services = [{
    name      : config.consul.name,
    address   : ip,
    port      : port,
    id        : id,
    check     : {
        tcp     : `${ip}:${port}`,
        interval: config.consul.interval || '2s',
        deregister_critical_service_after: config.consul.deregister || '10s'
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
        async.each(services, (service, callback) => {
            deregisterService(service, (err) => {
                return callback(null)
            })
        }, (err) => {
            return resolve(null)
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
