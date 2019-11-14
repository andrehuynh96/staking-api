const mongoose = require("mongoose");
const Http = require('http');
const Express = require('express');
const Cors = require('cors');
const Morgan = require('morgan');
const CronJob = require('cron').CronJob;
const BodyParser = require('body-parser');
const config = require("./config/config.js");
const Constants = require("./config/constants.js");
const Logger = require("./libs/logger.js");
const Routers = require('./routers');
const ip = require('ip');
const { tracker } = require('./middleware/response.tracking');
const {register, deregister} = require("./libs/consul");
const SyncValidators = require('./services/validators.sync.js');

// Constants.VERSION = require('child_process').execSync(`cd ${__dirname} && git describe --tag`).toString().trim();
// global.local_ip = ip.address();
let appName = Constants.NAME;

/**
 * Initialize Server
 */
let app = Express();
app.server = Http.createServer(app);

/**
 * Middleware
 */
app.use(Morgan('short', { "stream": Logger.stream }));
app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: false
}));
app.use(tracker);

// Init router
app.use('/', new Routers(app));
let isConsuleEnable = parseInt(config.consul.enable) === 1 ? true : false
/**
 * Error handler
*/
process.on('unhandledRejection', function (reason, p) {
    Logger.error('unhandledRejection', reason, p);
});

process.on('uncaughtException', (err) => {
    Logger.error(`${appName} uncaughtException`, err);
});

process.on('SIGINT', () => {
    Logger.info(`${appName} Stopped`);
    app.server.close((err) => {
        if (isConsuleEnable) {
            Logger.info('SIGINT. De-Registering...');
            deregister().then(err => {
                if (err) {
                    Logger.error(`SIGINT. De-Registering failed: ${err.message}`);
                }

                return process.exit()
            })
        } else {
          return process.exit()
        }
    })
});

let mongoUrl = `mongodb://${config.mongo.user}:${config.mongo.pass}@${config.mongo.host}:${config.mongo.port}/${config.mongo.dbname}`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) {
        Logger.error(`Mongo connection failed: ${err.message}`)
        return process.exit()
    }

    let sync = new SyncValidators();
    app.server.listen(config.port, () => {
        Logger.info(`Started on port ${config.port}`);
        new CronJob(config.schedule, function() {
          sync.start();
        }, null, true, 'America/Los_Angeles', null, true);

        if (isConsuleEnable) {
            Logger.info("Consul enable, start registering");
            register().catch(err => {
                Logger.error(`Register consul insight service failed: ${err.message}`)
                return process.exit();
            })
        }
    });
});
