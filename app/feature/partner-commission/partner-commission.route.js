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
															"id": "f62634d4-30f9-11ea-aec2-2e728ce88125",
                              "platform": "ATOM",
                              "symbol": "ATOM",
															"commission": 69,
															"reward_address": "cosmos1suvplzztw7kn4ntn9pcduxz2lxfjfy5akd3uk0",
															"staking_platform_id": "cba566c6-35ae-11ea-978f-2e728ce88125",
															"updated_by": 64,
															"updated_at": "2020-04-22T04:07:27.929Z",
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
															"commission": 68,
															"reward_address": "",
															"staking_platform_id": ""
													},
													{
															"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
															"platform": "ETH",
															"commission": 69,
															"reward_address": "",
															"staking_platform_id": ""
													},
													{
															"id": "f62634d4-30f9-11ea-aec2-2e728ce88125",
															"platform": "ATOM",
															"commission": 69,
															"reward_address": "",
															"staking_platform_id": ""
													},
													{
														"id": "24c39b32-2d13-11ea-978f-2e728ce88125",
															"platform": "IRIS",
															"commission": 70,
															"reward_address": "",
															"staking_platform_id": ""
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
														"staking_platform_id": "83675dbc-7a2e-40b8-a97b-867d1fa90319",
														"updated_by": 64,
														"updated_at": "2020-04-22T04:51:59.412Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												},
												{
														"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
														"platform": "ETH",
														"commission": 69,
														"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
														"staking_platform_id": "96a29602-257d-4041-85c4-ea0fb17e0e67",
														"updated_by": 64,
														"updated_at": "2020-04-22T04:52:01.134Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												},
												{
														"id": "f62634d4-30f9-11ea-aec2-2e728ce88125",
														"platform": "ATOM",
														"commission": 69,
														"reward_address": "cosmos1suvplzztw7kn4ntn9pcduxz2lxfjfy5akd3uk0",
														"updated_by": 64,
														"updated_at": "2020-04-22T04:52:02.087Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												},
												{
														"id": "24c39b32-2d13-11ea-978f-2e728ce88125",
														"platform": "IRIS",
														"commission": 70,
														"reward_address": "iaa16se3zaex588aqa6e0mgnps92a005mjm95d56jx",
														"updated_by": 64,
														"updated_at": "2020-04-22T04:52:03.219Z",
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
																"id": "f62634d4-30f9-11ea-aec2-2e728ce88125",
																"platform": "ATOM",
																"commission": 69,
																"reward_address": "cosmos1suvplzztw7kn4ntn9pcduxz2lxfjfy5akd3uk0",
																"updated_by": 64,
																"updated_at": "2020-04-22T04:52:02.087Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														},
														{
																"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
																"platform": "ETH",
																"commission": 69,
																"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
																"staking_platform_id": "96a29602-257d-4041-85c4-ea0fb17e0e67",
																"updated_by": 64,
																"updated_at": "2020-04-22T04:52:01.134Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
														},
														{
																"id": "3c3ed477-a40e-439c-97ff-a404498ed5c2",
																"platform": "ETH",
																"commission": 68,
																"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
																"staking_platform_id": "83675dbc-7a2e-40b8-a97b-867d1fa90319",
																"updated_by": 64,
																"updated_at": "2020-04-22T04:51:59.412Z",
																"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
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
															"staking_platform_id": "83675dbc-7a2e-40b8-a97b-867d1fa90319",
															"updated_by": 64,
															"updated_at": "2020-04-22T04:51:59.412Z",
															"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
													},
													{
															"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
															"platform": "ETH",
															"commission": 69,
															"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
															"staking_platform_id": "96a29602-257d-4041-85c4-ea0fb17e0e67",
															"updated_by": 64,
															"updated_at": "2020-04-22T04:52:01.134Z",
															"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
													},
													{
															"id": "eb56566b-dc6e-477b-a271-f712e887ea2c",
															"platform": "ETH",
															"commission": 11,
															"reward_address": "",
															"staking_platform_id": [
																	{
																			"id": "cba566c6-35ae-11ea-978f-2e728ce88125",
																			"symbol": "XTZ"
																	},
																	{
																			"id": "63c41ef1-6534-4f9e-b0c1-8433b2e186ce",
																			"symbol": "INFT"
																	},
																	{
																			"id": "bc7d5358-a429-461b-afe5-b67e6763567c",
																			"symbol": "INFT"
																	},
																	{
																			"id": "050b71b7-3914-4368-9e6c-a57ec5cb8d08",
																			"symbol": "Tst"
																	}
															],
															"updated_by": 10,
															"updated_at": "2020-04-16T11:06:39.390Z",
															"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
													}
											],
											"offset": 0,
											"limit": 10,
											"total": 3
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
														"staking_platform_id": [
																{
																			"id": "cba566c6-35ae-11ea-978f-2e728ce88125",
																			"symbol": "XTZ"
																	},
																	{
																			"id": "63c41ef1-6534-4f9e-b0c1-8433b2e186ce",
																			"symbol": "INFT"
																	},
																	{
																			"id": "bc7d5358-a429-461b-afe5-b67e6763567c",
																			"symbol": "INFT"
																	},
																	{
																			"id": "050b71b7-3914-4368-9e6c-a57ec5cb8d08",
																			"symbol": "Tst"
																	}
														],
														"updated_by": 64,
														"updated_at": "2020-04-22T04:51:59.412Z",
														"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
												},
												{
														"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
														"platform": "ETH",
														"commission": 69,
														"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
														"staking_platform_id": "96a29602-257d-4041-85c4-ea0fb17e0e67",
														"updated_by": 64,
														"updated_at": "2020-04-22T04:52:01.134Z",
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
															"staking_platform_id": [
																	{
																			"id": "cba566c6-35ae-11ea-978f-2e728ce88125",
																			"symbol": "XTZ"
																	},
																	{
																			"id": "63c41ef1-6534-4f9e-b0c1-8433b2e186ce",
																			"symbol": "INFT"
																	},
																	{
																			"id": "bc7d5358-a429-461b-afe5-b67e6763567c",
																			"symbol": "INFT"
																	},
																	{
																			"id": "050b71b7-3914-4368-9e6c-a57ec5cb8d08",
																			"symbol": "Tst"
																	}
															],
															"updated_by": 64,
															"updated_at": "2020-04-22T04:07:27.929Z",
															"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
													},
													{
															"id": "3c3ed477-a40e-439c-97ff-a404498ed5c2",
															"platform": "ETH",
															"commission": 68,
															"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
															"staking_platform_id": "83675dbc-7a2e-40b8-a97b-867d1fa90319",
															"updated_by": 64,
															"updated_at": "2020-04-22T04:07:25.381Z",
															"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
													},
													{
															"id": "ac098ffd-1ff3-47c5-9244-38eda2dcfc59",
															"platform": "ETH",
															"commission": 69,
															"reward_address": "0x61179C42C57BFE59C5CecA25B3B66f6Ee3b15cD7",
															"staking_platform_id": "96a29602-257d-4041-85c4-ea0fb17e0e67",
															"updated_by": 64,
															"updated_at": "2020-04-22T04:07:27.049Z",
															"partner_updated_by": "ed483de6-2d14-11ea-978f-2e728ce88125"
													},
													{
															"id": "24c39b32-2d13-11ea-978f-2e728ce88125",
															"platform": "IRIS",
															"commission": 70,
															"reward_address": "iaa16se3zaex588aqa6e0mgnps92a005mjm95d56jx",
															"staking_platform_id": [
																	{
																			"id": "cba566c6-35ae-11ea-978f-2e728ce88125",
																			"symbol": "XTZ"
																	},
																	{
																			"id": "63c41ef1-6534-4f9e-b0c1-8433b2e186ce",
																			"symbol": "INFT"
																	},
																	{
																			"id": "bc7d5358-a429-461b-afe5-b67e6763567c",
																			"symbol": "INFT"
																	},
																	{
																			"id": "050b71b7-3914-4368-9e6c-a57ec5cb8d08",
																			"symbol": "Tst"
																	}
															],
															"updated_by": 64,
															"updated_at": "2020-04-22T04:07:28.715Z",
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