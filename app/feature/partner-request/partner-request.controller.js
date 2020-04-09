const logger = require('app/lib/logger');
const PartnerRequest = require('app/model').partner_request_change_reward_addresses;
const PartnerCommission = require('app/model').partner_commissions;
const uuidV4 = require('uuid/v4');
const database = require('app/lib/database');
const PartnerRequestStatus = require('app/model/value-object/request-change-reward-address-status');

module.exports = {
    create: async (req, res, next) => {
        try {
            let {params: {partner_id, commission_id }, body} = req;
            let verifyToken = Buffer.from(uuidV4()).toString('base64');
            let data = {
                ...body,
                partner_id: partner_id,
                partner_commission_id: commission_id,
                verify_token: verifyToken
            }
            await PartnerRequest.create(data);
            return res.ok(verifyToken);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
    update : async (req, res, next) => {
        const transaction = await database.instanse.transaction();
        try {
            let {params: {partner_id, commission_id, id}, body: {status, email, token}} = req;
            let partnerRequest = await PartnerRequest.findOne({
                where: {
                    partner_id: partner_id,
                    partner_commission_id: commission_id,
                    id: id
                }
            });
            if (!partnerRequest) {
                return res.badRequest(res.__("CHANGE_REQUEST_ADDRESS_NOT_FOUND"), "CHANGE_REQUEST_ADDRESS_NOT_FOUND");
            }
            if (partnerRequest.verify_token != token) {
                return res.badRequest(res.__("TOKEN_INVALID"), "TOKEN_INVALID", { fields: ["verify_token"] });
            }
            await PartnerRequest.update({
                status: status,
                email_confirmed: email
            }, {
                where: {
                    partner_id: partner_id,
                    partner_commission_id: commission_id,
                    id: id
                },
            }, { transaction });
            if (status == PartnerRequestStatus.DONE) {
                await PartnerCommission.update({
                    reward_address: partnerRequest.reward_address
                }, {
                    where: {
                       id:  commission_id,
                       partner_id: partner_id
                    }
                }, {transaction})
            }
            await transaction.commit();
            return res.ok(true);
        } catch (error) {
            logger.error(error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    }
}

