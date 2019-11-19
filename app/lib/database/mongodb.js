const mongoose = require("mongoose");
const config = require("app/config");
const mongooseTimestamp = require("mongoose-timestamp");
const Schema = mongoose.Schema;

let dbs = [];
let numberDb = 0;
mongoose.plugin(mongooseTimestamp, {
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = {
  init: (callback) => {
    let num = 0;
    let start = (db) => {
      db.on('connected', function (err) {
        num++;
        if (num === numberDb) {
          callback();
        }
      });
      db.on('error', function (err) {
        callback(err);
      });
    };
    let dbNames = Object.keys(config.db);
    numberDb = dbNames.length;
    dbNames.forEach((dbName) => {
      dbs[dbName] = mongoose.createConnection(config.db[dbName]);
      start(dbs[dbName]);
    });
  },
  close() {
    if (dbs && dbs.length > 0) {
      dbs.forEach((db) => {
        db.close();
      });
    }
  },
  Schema: Schema,
  mongoose: mongoose,
  db() {
    return {
      ...dbs
    }
  }
}