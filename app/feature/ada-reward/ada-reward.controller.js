const logger = require('app/lib/logger');
const AdaRewardAddresses = require('app/model').ada_reward_addresses;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');

module.exports = {
  get: async (req, res, next) => {
    try {
      let { address, date } = req.query;
      let toDate = date ? moment.utc(date) : moment.utc();
      let fromDate = date ? moment.utc(date) : moment.utc();
      toDate.utcOffset(0);
      fromDate.utcOffset(0);
      toDate.set({ hour: 23, minute: 59, second: 59 });
      fromDate.set({ hour: 0, minute: 0, second: 0 });

      address = address.split(',');
      const result = await AdaRewardAddresses.findAll({
        attributes: [
          "address",
          [Sequelize.fn("sum", Sequelize.col('amount')), "amount"],
          [Sequelize.literal("CONCAT( DATE_PART('YEAR', date_reward), '-', TRIM(to_char(DATE_PART('MONTH', date_reward),'00')), '-', TRIM(to_char(DATE_PART('DAY',date_reward),'00')))"), "reward_date"]
        ],
        where: {
          address: {
            [Op.in]: address
          },
          date_reward: {
            [Op.gte]: fromDate,
            [Op.lt]: toDate
          }
        },
        group: ['reward_date', 'address']
      });
      return res.ok(result);
    } catch (error) {
      logger.error('get ada reward fail', error);
      next(error);
    }
  }
};
