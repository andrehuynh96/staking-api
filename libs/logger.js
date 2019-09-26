const config = require('../config/config.js');
const Log4js = require('log4js');

var logLayout = {
    type: 'pattern',
    pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} %p %z %c %m'
};

Log4js.configure({
    pm2: true,
    appenders: {
        FILE: {
            type        : 'dateFile',
            filename    : "./logs/app.log",
            pattern     : '.yyyy-MM-dd-hh',
            level       : 'trace',
            layout      : logLayout,
            compress    : false,
            daysToKeep  : 90
        },
        CONSOLE: {
            type        : 'stdout',
            layout      : logLayout,
            level       : 'trace',
            layout      : logLayout
        },
        HTTPLOG:{
            type        :'http-appender',
            layout      : logLayout
        },
        HTTPLOG_LEVEL:{
            type        :'logLevelFilter',
            appender    : 'HTTPLOG',
            level       : 'info'
        },
        // Export Error in one file
        FILE_ERROR: {
            type        : 'dateFile',
            filename    : "./logs/consul_error.log",
            pattern     : '.yyyy-MM-dd-hh',
            level       : 'trace',
            layout      : logLayout,
            compress    : false,
            daysToKeep  : 90
        },
        ERROR_ONLY: { type: 'logLevelFilter', appender: 'FILE_ERROR', level: 'error'},
        EMAIL:{
            type: 'smtp',
            SMTP: {
                host: 'smtp.gmail.com',
                port: 465,
                secureConnection: true,
                auth:{
                    user: config.mail.auth.user,
                    pass: config.mail.auth.pass
                }
            },
            sendInterval   : 30,
            recipients     : config.mail.recipients,
            subject        : config.mail.subject,
            sender         : config.mail.auth.user
        },
        EMAIL_ERROR:{ type: 'logLevelFilter', appender: 'EMAIL', level: 'error'},
        out: { type: "stdout" }
    },
    categories: {
        default: {
            appenders: config.logger.appenders,
            level: config.logger.file.level || "info"
        }
    }
});
const instance = Log4js.getLogger('INFINITO-XLM-INSIGHT');

instance.getLogger = function(name) {
    return Log4js.getLogger(name);
}

module.exports = instance;
