'use strict';
const bech32 = require("bech32");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let result = await queryInterface.sequelize.query("select * from tracking_votes where  platform  in ('ADA','TADA') and (stake_address is null or stake_address = '')", { type: queryInterface.sequelize.QueryTypes.SELECT });

    if (result && result.length > 0) {
      for (let e of result) {
        let decodedAddr = bech32.decode(e.voter_address, 200);
        let bytes = Buffer.from(bech32.fromWords(decodedAddr.words, 'hex'));
        let hexKeys = bytes.toString('hex').slice(2);
        let length = hexKeys.length;
        let stakeKey = hexKeys.slice(length / 2);
        let stakeAddr = bech32.encode('stake', bech32.toWords(Buffer.from('e1' + stakeKey, 'hex')));

        await queryInterface.sequelize.query(`update tracking_votes set stake_address ='${stakeAddr}' where id = '${e.id}'`);
      }
    }
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
