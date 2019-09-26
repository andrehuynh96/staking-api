const request = require('request');
const config = require('./config/config');
const Messages = require('./libs/messages.js');
const Constants = require('./config/constants');

const httpAppender = (layout, timezoneOffset) => loggingEvent => {
  if (!config.tracking.enable) {
    return;
  }

  if (loggingEvent.data && loggingEvent.data.length) {
    loggingEvent.data = loggingEvent.data.join(', ')
  }

  let options = {
    uri: config.tracking.url,
    method: "POST",
    json: {
      name: config.appName,
      level: loggingEvent.level.levelStr,
      message: "LOGS",
      version: Constants.VERSION,
      meta_logger: loggingEvent,
      env: "dev",
      ip: global.local_ip,
      timestamp: new Date()
    }
  };

  request(options, function (err, response, body) {
    if (err) {
      console.error(err);
      return;
    }
  });

}

const configure = (config, layouts) => {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  //create a new appender instance
  return httpAppender(layout, config.timezoneOffset);
}

//export the only function needed
exports.configure = configure;
