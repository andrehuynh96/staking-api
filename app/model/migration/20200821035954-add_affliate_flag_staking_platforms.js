'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.describeTable('staking_platforms')
          .then(tableDefinition => {
            if (tableDefinition['affiliate_flg']) {
              return Promise.resolve();
            }
            return queryInterface.addColumn('staking_platforms', 'affiliate_flg', {
              type: Sequelize.DataTypes.BOOLEAN,
              allowNull: false,
              defaultValue: false
            });
          })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
