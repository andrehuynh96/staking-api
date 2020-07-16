'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.describeTable('cosmos_account_contributions')
          .then(tableDefinition => {
            if (tableDefinition['affiliate_reward_id']) {
              return Promise.resolve();
            }
            return queryInterface.addColumn('cosmos_account_contributions', 'affiliate_reward_id', {
              type: Sequelize.DataTypes.STRING(128),
              allowNull: true
            });
          }),
        queryInterface.describeTable('iris_account_contributions')
          .then(tableDefinition => {
            if (tableDefinition['affiliate_reward_id']) {
              return Promise.resolve();
            }
            return queryInterface.addColumn('iris_account_contributions', 'affiliate_reward_id', {
              type: Sequelize.DataTypes.STRING(128),
              allowNull: true
            });
          }),

        queryInterface.describeTable('ont_staking_contributions')
          .then(tableDefinition => {
            if (tableDefinition['affiliate_reward_id']) {
              return Promise.resolve();
            }
            return queryInterface.addColumn('ont_staking_contributions', 'affiliate_reward_id', {
              type: Sequelize.DataTypes.STRING(128),
              allowNull: true
            });
          }),

      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
