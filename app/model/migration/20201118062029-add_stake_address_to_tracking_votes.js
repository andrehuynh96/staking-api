'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.describeTable('tracking_votes')
          .then(tableDefinition => {
            if (tableDefinition['stake_address']) {
              return Promise.resolve();
            }
            return queryInterface.addColumn('tracking_votes', 'stake_address', {
              type: Sequelize.DataTypes.STRING(256),
              allowNull: true
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
