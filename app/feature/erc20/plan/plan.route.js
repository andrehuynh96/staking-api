const express = require("express");
const controller = require("./plan.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();
const validatingSchema = require('./plan.request-schema');
const validatorQuery = require("app/middleware/validator.query.middleware");

route.get("/erc20/plans",
  authenticate,
  validatorQuery(validatingSchema.allPlans),
  controller.getAllPlans
);

route.get("/erc20/plans/:id",
  authenticate,
  controller.getPlan
);

module.exports = route;


/*********************************************************************/

/**
 * @swagger
 * /api/v1/erc20/plans:
 *   get:
 *     summary: Get all plans
 *     tags:
 *       - erc20
 *     description: Get all plans of erc20 staking
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: query
 *         name: status
 *         type: string
 *         description: Status of plans, it is `all`, `active` or `deactive` (ommit is all).
 *       - in: query
 *         name: staking_platform_id
 *         description: Staking platform id.
 *         type: string
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
                        "id": "0e37df36-f698-11e6-8dd4-cb9ced3df976",
                        "name": "plan-001",
                        "duration": 10,
                        "duration_type": "YEAR",
                        "reward_percentage": "9.100",
                        "status": 1,
                        "reward_diff_token_flg": false,
                        "diff_token_rate": 0,
                        "tx_id": "",
                        "wait_blockchain_confirm_status_flg": false,
                        "staking_platform_id": "36b7f440-1a3b-11ea-978f-2e728ce88125",
                        "created_at": ""
                    },
                    {
                        "id": "0e37df36-f698-11e6-8dd4-cb9ced3df976",
                        "name": "plan-003",
                        "duration": 10,
                        "duration_type": "YEAR",
                        "reward_percentage": "9.100",
                        "status": 1,
                        "reward_diff_token_flg": false,
                        "diff_token_rate": 0,
                        "tx_id": "",
                        "wait_blockchain_confirm_status_flg": false,
                        "staking_platform_id": "36b7f440-1a3b-11ea-978f-2e728ce88125",
                        "created_at": ""
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
 * /api/v1/erc20/plans/{id}:
 *   get:
 *     summary: Get plan by id
 *     tags:
 *       - erc20
 *     description: Get plan by id
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: path
 *         name: id
 *         type: string
 *         description: uuid of plan
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok 
 *         examples:
 *           application/json:
 *             {
 *                 "data": {
                        "id": "950002a9-07b4-41c1-990c-9290e5b73596",
                        "name": "Standard",
                        "duration": 69,
                        "duration_type": "DAY",
                        "reward_percentage": 10,
                        "status": 1,
                        "reward_diff_token_flg": false,
                        "staking_payout_id": 2,
                        "diff_token_rate": 0,
                        "tx_id": null,
                        "wait_blockchain_confirm_status_flg": false,
                        "staking_platform_id": "96b7f440-1a3b-11ea-978f-2e728ce88125",
                        "created_at": "2020-03-11T09:13:51.541Z"
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
