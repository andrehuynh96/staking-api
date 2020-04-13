const logger = require('app/lib/logger');
const config = require('app/config');
const TxMemo = require('app/model').partner_tx_memos;
const mapper = require('app/feature/response-schema/partner-tx-memo.response-schema');
const database = require('app/lib/database').instanse;

module.exports = {
    all: async (req, res, next) => {
        try {
            logger.info('partner-tx-memo::all');
            let limit = req.query.limit ? parseInt(req.query.limit) : 10;
			let offset = req.query.offset ? parseInt(req.query.offset) : 0;
            const where = { partner_id: req.params.partner_id, default_flg: true };
            const { count: total, rows: partner_tx_memos } = await TxMemo.findAndCountAll({limit, offset, where: where, order: [['platform', 'ASC']] });
            return res.ok({
                items: partner_tx_memos.map(item => mapper(item)),
                offset: offset,
                limit: limit,
                total: total
            });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
    create: async (req, res, next) => {
        let transaction;
        try {
            logger.info('partner-tx-memo::create');
            const { params: { partner_id }, body: { items, user_id } } = req;
            let updatedItems = [];
            let insertedItems = [];
            transaction = await database.transaction();
            for (let item of items) {
              let condition = {
                partner_id: partner_id,
                platform: item.platform,
                default_flg: true
              };
              let txMemo = await TxMemo.findOne({where: condition});
              condition.memo = item.memo;
              let existMemo = await TxMemo.findOne({where: condition});
              if (!existMemo) {
                item.created_by = user_id;
                item.updated_by = user_id;
                item.partner_id = partner_id;
                item.default_flg = true;
                insertedItems.push(item);
                if (txMemo && txMemo.id) updatedItems.push(txMemo.id);
              } 
            }
            let partner_tx_memos = await TxMemo.bulkCreate(insertedItems, { transaction });
            console.log(user_id)
            await TxMemo.update({
              default_flg: false,
              updated_by: user_id
            }, {
                where: {
                  id: updatedItems
                }
              }, { transaction });
            logger.info('partner-tx-memo::update::partner-tx-memo::', JSON.stringify(partner_tx_memos));
            await transaction.commit();
            return res.ok({
              items: partner_tx_memos.map(item => mapper(item))
            });
          } catch (error) {
            logger.error(error);
            if (transaction) await transaction.rollback();
            next(error);
          }
    },
    getHis: async (req, res, next) => {
        try {
            logger.info('partner-tx-memo::all::histories');
            let limit = req.query.limit ? parseInt(req.query.limit) : 10;
            let offset = req.query.offset ? parseInt(req.query.offset) : 0;
            const where = { partner_id: req.params.partner_id, default_flg: false };
            const { count: total, rows: partner_tx_memos } = await TxMemo.findAndCountAll({limit, offset, where: where, order: [['platform', 'ASC']]});
            return res.ok({
              items: partner_tx_memos.map(item => mapper(item)),
              offset: offset,
              limit: limit,
              total: total
            });
          } catch (error) {
            logger.error(error);
            next(error);
          }
    },
}