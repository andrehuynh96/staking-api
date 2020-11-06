'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.describeTable('validators')
          .then(tableDefinition => {
            if (tableDefinition['name']) {
              return Promise.resolve();
            }
            return queryInterface.addColumn('validators', 'name', {
              type: Sequelize.DataTypes.STRING(1024),
              allowNull: true
            });
          }),

        queryInterface.describeTable('validators')
          .then(tableDefinition => {
            if (tableDefinition['status']) {
              return Promise.resolve();
            }
            return queryInterface.addColumn('validators', 'status', {
              type: Sequelize.DataTypes.INTEGER,
              allowNull: true,
              defaultValue: 1
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
