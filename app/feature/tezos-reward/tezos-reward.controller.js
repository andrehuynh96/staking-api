const logger = require('app/lib/logger');
const Payment = require('app/model/tezos').payments;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const BigNumber = require('bignumber.js');
module.exports = {
    get: async(req,res,next)=> {
        try {
            const address = req.params.address;
            const today =  moment.utc().format();
            const startDay =moment(today).startOf('date').toDate();
            let amount = 0;
            const tezosRewards = await Payment.findAll({
                where: {
                    address: address,
                    created_at: {
                        [Op.gte]: startDay,
                        [Op.lt]: today
                    },
                    hash: { [Op.notILike]: 'none'},
                    paid: 1
                }
            });
            if (tezosRewards.length > 0) {
                tezosRewards.forEach(item=> {
                    amount += BigNumber(item.amount).toNumber();
                });
                return res.ok({ amount: amount });
            }
            else {
                return res.ok({ amount: 0 });
            }
        } catch (error) {
            logger.error('ger tezos reward fail',error);
            next(error);
        }
    }
};
