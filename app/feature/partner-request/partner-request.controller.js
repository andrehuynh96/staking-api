const logger = require('app/lib/logger');
const PartnerRequest = require('app/model').partner_request_change_reward_addresses;
const PartnerCommission = require('app/model').partner_commissions;
const uuidV4 = require('uuid/v4');
const database = require('app/lib/database');
const PartnerRequestStatus = require('app/model/value-object/request-change-reward-address-status');
const User = require('app/model').users;
const UserRole = require('app/model').user_roles;
const Permission = require('app/model').permissions;
const RolePermission = require('app/model').role_permissions;
const Partner = require('app/model').partners;

module.exports = {
    create: async (req, res, next) => {
        try {
            let {params: {commission_id }, body} = req;
            let verifyToken = Buffer.from(uuidV4()).toString('base64');
            let commission = await PartnerCommission.findOne({
                where: {
                    id: commission_id,
                    partner_id: req.user.client_id
                }
            });
            if (!commission) {
                return res.badRequest(res.__("PARTNER_COMMISSION_NOT_FOUND"), "PARTNER_COMMISSION_NOT_FOUND");
            }
            let data = {
                ...body,
                partner_id: req.user.client_id,
                partner_commission_id: commission_id,
                verify_token: verifyToken
            }
            await PartnerRequest.create(data);
            return res.ok({
                verify_token: verifyToken,
                platform: commission.platform
            });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    },
    update : async (req, res, next) => {
        const transaction = await database.instanse.transaction();
        try {
            let {body: {status, email, token}} = req;
            let partner = await Partner.findOne({
                where: {
                    id: req.user.client_id
                }
            });
            let partnerRequest = await PartnerRequest.findOne({
                where: {
                    partner_id: req.user.client_id,
                    verify_token: token
                }
            });
            if (!partnerRequest) {
                return res.badRequest(res.__("TOKEN_INVALID"), "TOKEN_INVALID", { fields: ["verify_token"] });
            }
            let commission = await PartnerCommission.findOne({
                where: {
                    id: partnerRequest.partner_commission_id
                }
            })
            await PartnerRequest.update({
                status: status,
                email_confirmed: email
            }, {
                where: {
                    partner_id: req.user.client_id,
                    id: partnerRequest.id
                },
            }, { transaction });
            let emails = [];
            if (status == PartnerRequestStatus.DONE) {
                await PartnerCommission.update({
                    reward_address: partnerRequest.reward_address
                }, {
                    where: {
                       id:  partnerRequest.partner_commission_id,
                       partner_id: req.user.client_id
                    }
                }, {transaction})
            } else {
                let permission = await Permission.findOne({
                    where: {
                        name: 'UPDATE_PARTNER_REQUEST_CHANGE_REWARD_ADDRESS'
                    }
                });

                if (permission) {
                    let rolePermission = await RolePermission.findOne({
                        where: {
                            permission_id: permission.id
                        }
                    })
                    if (rolePermission) {
                        let include = [
                            {
                                model: UserRole,
                                where: {
                                    role_id: rolePermission.role_id
                                },
                            }
                        ];
                        let users = await User.findAll({
                            where: {
                                deleted_flg: false 
                            },
                            include: include
                        });
                        emails = users.map(e => e.email);
                    }
                }
            }
            await transaction.commit();
            return res.ok({
                partner: partner.name,
                platform: commission.platform,
                address: partnerRequest.reward_address,
                emails: emails
            });
        } catch (error) {
            logger.error(error);
            if (transaction) await transaction.rollback();
            next(error);
        }
    }
}

