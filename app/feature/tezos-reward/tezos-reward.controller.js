const logger = require('app/lib/logger');
const Payment = require('app/model/tezos_reward').payments;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment')
module.exports = {
    get: async(req,res,next)=> {
        try {
            const address = req.params.address;
            const today = new Date();
            const startDay =moment(today).startOf('date').toDate();
            const endDay = moment(today).endDay('date').toDate();
            let amount = 0;
            const tezosRewards = await Payment.findAll({
                where: {
                    address: address,
                    created_at: {
                        [Op.gte]: startDay,
                        [Op.lt]: endDay
                    },
                    hash: { [Op.notILike]: 'none'},
                    paid: 1
                }
            });
            if (tezosRewards.length > 0) {
                tezosRewards.forEach(item=> {
                    amount += item.amount;
                });
            }
            else {
                return amount;
            }
            return amount;
        } catch (error) {
            logger.error('ger tezos reward fail',error);
            next(error);
        }
    }
};
