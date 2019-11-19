const config = require('app/config');
const Sequelize = require('sequelize');


module.exports = {
  init: async callback => {
    try {
      const sequelize = new Sequelize(
        config.postpres.database,
        config.postpres.username,
        config.postpres.password,
        config.postpres.options
      );
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
  instanse: sequelize,
};
