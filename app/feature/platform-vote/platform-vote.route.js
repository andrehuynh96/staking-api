const express = require("express");
const controller = require("./platform-vote.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();

route.get("/platform-votes",
  authenticate,
  controller.getAll
)

route.get("/platform-votes/:id",
  authenticate,
  controller.get
)

/*********************************************************************/

/**
 * @swagger
 * /api/v1/platform-votes:
 *   get:
 *     summary: platform voting
 *     tags:
 *       - Platform Voting
 *     description: Platform Voting
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}  
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
                          "id":"3f76680510bcca07e7e011dcc1effb079d1d0a34",
                          "name":"Cosmos",
                          "symbol":"ATOM",
                          "icon":"https://static.chainservices.info/staking/platforms/cosmos.png",
                          "description":"The best platform for staking",
                          "order_index":1,
                          "estimate_earn_per_year":10.3,
                          "lockup_unvote":21,
                          "lockup_unvote_unit":"DAY",
                          "payout_reward":2,
                          "payout_reward_unit":"HOUR|DAY|MONTH|YEAR",
                          "status":"0|1"
                        }
 *                   ]
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
 * /api/v1/platform-votes/{id}:
 *   get:
 *     summary: get platform voting by id
 *     tags:
 *       - Platform Voting
 *     description: get platform voting by id
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: path
 *         name: id
 *         type: string
 *         description: uuid of platform vote
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok 
 *         examples:
 *           application/json:
 *             {
 *                 "data": {
                      "id": "96b7f440-1a3b-11ea-978f-2e728ce88125",
                      "platform": "ETH",
                      "name": "ETH",
                      "symbol": "ETH",
                      "icon": "https://static.chainservices.info/staking/platforms/eth.png",
                      "description": null,
                      "order_index": 99,
                      "estimate_earn_per_year": "10",
                      "lockup_unvote": 21,
                      "lockup_unvote_unit": "DAY",
                      "payout_reward": 0,
                      "payout_reward_unit": "DAY",
                      "status": 0,
                      "confirmation_block": 5,
                      "staking_type": "CONTRACT",
                      "sc_lookup_addr": "0x1716a6f9D3917966d934Ce7837113A30dFFda9F4",
                      "sc_token_address": "0x423822D571Bb697dDD993c04B507dD40E754cF05",
                      "erc20_duration": "10 ~ 20 days",
                      "erc20_reward_estimate": "10%~20%",
                      "erc20_validator_fee": 20,
                      "validator_address": null,
                      "deleted_flg": false,
                      "created_by": 0,
                      "updated_by": 0,
                      "tx_id": null,
                      "wait_blockchain_confirm_status_flg": false,
                      "createdAt": "2020-01-13T06:47:41.248Z",
                      "updatedAt": "2020-01-15T08:05:28.024Z"
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


module.exports = route;