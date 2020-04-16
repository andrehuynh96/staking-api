const express = require("express");
const controller = require("./partner-commission.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const validator = require('app/middleware/validator.middleware');
const { update } = require('./validator');
const route = express.Router();

route.get(
	"/partners/:partner_id/commissions",
	authenticate,
	controller.getAll
);

route.get(
	'/partners/:partner_id/commissions/histories',
	authenticate,
	controller.getHis
);

route.post(
	'/partners/:partner_id/commissions',
	authenticate,
	validator(update),
	controller.update
);

route.get(
	"/partners/commissions/:platform",
	authenticate,
	controller.getAllByPlatform
);

route.get(
	"/partners/:partner_id/commissions/:platform",
	authenticate,
	controller.get
);

route.get(
	"/me/commissions",
	authenticate,
	controller.getAllByPartner
);


module.exports = route;

/*********************************************************************/

/**
 * @swagger
 * /api/v1/partners/{partner_id}/commissions:
 *   get:
 *     summary: get list of partner commissions
 *     tags:
 *       - Commission
 *     description: get list of partner commissions by partner_id
 *     parameters:
 *       - in: path
 *         name: partner_id
 *         type: string
 *         required: true
 *       - name: offset
 *         in: query
 *         type: integer
 *         format: int32
 *       - name: limit
 *         in: query
 *         type: integer
 *         format: int32
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": {
												"items": [
														{
																"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
																"platform": "ETH",
																"commission": 69,
																"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:48.954Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														},
														{
																"id": "24c39b32-2d13-11ea-978f-2e728ce88125",
																"platform": "IRIS",
																"commission": 70,
																"reward_address": "iaa16se3zaex588aqa6e0mgnps92a005mjm95d56jx",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:50.051Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														}
												],
												"offset": 0,
												"limit": 10,
												"total": 2
										}
 *             }
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/401'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/404'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/500'
 */

/*********************************************************************/

/**
 * @swagger
 * /api/v1/partners/{partner_id}/commissions:
 *   post:
 *     summary: create/update partner commissions
 *     tags:
 *       - Commission
 *     description: update partner commission if commission has field `id`, otherwise create new commission
 *     parameters:
 *       - in: path
 *         name: partner_id
 *         type: string
 *         required: true
 *       - in: body
 *         name: data
 *         description: Data for commision.
 *         schema:
 *            type: array
 *            example:
 *               {
                      "items": [
													{
															"id": "3c3ed477-a40e-439c-97ff-a404498ed5c2",
															"platform": "ETH",
															"commission": 68
													},
													{
															"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
															"platform": "ETH",
															"commission": 69
													},
													{
															"id": "f62634d4-30f9-11ea-aec2-2e728ce88125",
															"platform": "ATOM",
															"commission": 69
													},
													{
															"id": "24c39b32-2d13-11ea-978f-2e728ce88125",
															"platform": "IRIS",
															"commission": 70
													}
											],
											"updated_by": 64
                  }
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": [
												{
														"id": "3c3ed477-a40e-439c-97ff-a404498ed5c2",
														"platform": "ETH",
														"commission": 68,
														"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
														"updated_by": 64,
														"updated_at": "2020-04-16T08:29:47.998Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												},
												{
														"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
														"platform": "ETH",
														"commission": 69,
														"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
														"updated_by": 64,
														"updated_at": "2020-04-16T08:29:48.954Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												},
												{
														"id": "f62634d4-30f9-11ea-aec2-2e728ce88125",
														"platform": "ATOM",
														"commission": 69,
														"reward_address": "cosmos1suvplzztw7kn4ntn9pcduxz2lxfjfy5akd3uk0",
														"updated_by": 64,
														"updated_at": "2020-04-16T08:29:49.493Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												},
												{
														"id": "24c39b32-2d13-11ea-978f-2e728ce88125",
														"platform": "IRIS",
														"commission": 70,
														"reward_address": "iaa16se3zaex588aqa6e0mgnps92a005mjm95d56jx",
														"updated_by": 64,
														"updated_at": "2020-04-16T08:29:50.051Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												}
										]
 *             }
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/401'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/404'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/500'
 */

/*********************************************************************/

/**
 * @swagger
 * /api/v1/partners/{partner_id}/commissions/histories:
 *   get:
 *     summary: get partner commission histories
 *     tags:
 *       - Commission
 *     description:
 *     parameters:
 *       - in: path
 *         name: partner_id
 *         type: string
 *         required: true
 *       - name: offset
 *         in: query
 *         type: integer
 *         format: int32
 *       - name: limit
 *         in: query
 *         type: integer
 *         format: int32
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
                    "data": {
												"items": [
														{
																"id": "3c3ed477-a40e-439c-97ff-a404498ed5c2",
																"platform": "ETH",
																"commission": 68,
																"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:47.998Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														},
														{
																"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
																"platform": "ETH",
																"commission": 69,
																"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:48.954Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														},
														{
																"id": "f62634d4-30f9-11ea-aec2-2e728ce88125",
																"platform": "ATOM",
																"commission": 21,
																"reward_address": "cosmos1suvplzztw7kn4ntn9pcduxz2lxfjfy5akd3uk0",
																"updated_by": 17,
																"updated_at": "2020-04-15T08:00:09.242Z"
														},
														{
																"id": "f62634d4-30f9-11ea-aec2-2e728ce88125",
																"platform": "ATOM",
																"commission": 111,
																"reward_address": "cosmos1suvplzztw7kn4ntn9pcduxz2lxfjfy5akd3uk0",
																"updated_by": 17,
																"updated_at": "2020-04-15T08:03:00.830Z"
														}
												],
												"offset": 0,
												"limit": 4,
												"total": 77
										}
 *             }
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/401'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/404'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/500'
 *
 */

/*********************************************************************/

/**
 * @swagger
 * /api/v1/partners/commissions/{platform}:
 *   get:
 *     summary: get list of partner commissions by platform
 *     tags:
 *       - Commission
 *     description: get list of partner commissions by platform
 *     parameters:
 *       - in: path
 *         name: platform
 *         type: string
 *         required: true
 *       - name: offset
 *         in: query
 *         type: integer
 *         format: int32
 *       - name: limit
 *         in: query
 *         type: integer
 *         format: int32
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": {
												"items": [
														{
																"id": "3c3ed477-a40e-439c-97ff-a404498ed5c2",
																"platform": "ETH",
																"commission": 68,
																"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:47.998Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														},
														{
																"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
																"platform": "ETH",
																"commission": 69,
																"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:48.954Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														}
												],
												"offset": 0,
												"limit": 10,
												"total": 2
										}
 *             }
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/401'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/404'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/500'
 */

/*********************************************************************/

/**
 * @swagger
 * /api/v1/partners/{partner_id}/commissions/{platform}:
 *   get:
 *     summary: get commission by platform and partner_id
 *     tags:
 *       - Commission
 *     description: get commission by platform and partner_id
 *     parameters:
 *       - in: path
 *         name: partner_id
 *         type: string
 *         required: true
 *       - in: path
 *         name: platform
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": [
												{
														"id": "3c3ed477-a40e-439c-97ff-a404498ed5c2",
														"platform": "ETH",
														"commission": 68,
														"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
														"updated_by": 64,
														"updated_at": "2020-04-16T08:29:47.998Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												},
												{
														"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
														"platform": "ETH",
														"commission": 69,
														"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
														"updated_by": 64,
														"updated_at": "2020-04-16T08:29:48.954Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												}
										]
 *             }
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/401'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/404'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/500'
 */

/*********************************************************************/

/**
 * @swagger
 * /api/v1/me/commissions:
 *   get:
 *     summary: get list of partner commissions by partner
 *     tags:
 *       - Commission
 *     description: get list of partner commissions by partner
 *     parameters:
 *       - name: offset
 *         in: query
 *         type: integer
 *         format: int32
 *       - name: limit
 *         in: query
 *         type: integer
 *         format: int32
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data": {
												"items": [
														{
																"id": "f62634d4-30f9-11ea-aec2-2e728ce88125",
																"platform": "ATOM",
																"commission": 69,
																"reward_address": "cosmos1suvplzztw7kn4ntn9pcduxz2lxfjfy5akd3uk0",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:49.493Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														},
														{
																"id": "3c3ed477-a40e-439c-97ff-a404498ed5c2",
																"platform": "ETH",
																"commission": 68,
																"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:47.998Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														},
														{
																"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
																"platform": "ETH",
																"commission": 69,
																"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:48.954Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														},
														{
																"id": "24c39b32-2d13-11ea-978f-2e728ce88125",
																"platform": "IRIS",
																"commission": 70,
																"reward_address": "iaa16se3zaex588aqa6e0mgnps92a005mjm95d56jx",
																"updated_by": 64,
																"updated_at": "2020-04-16T08:29:50.051Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														}
												],
												"offset": 0,
												"limit": 10,
												"total": 4
										}
 *             }
 *       400:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/400'
 *       401:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/401'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/404'
 *       500:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/500'
 */