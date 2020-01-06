const express = require("express");
const controller = require("./erc20.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();
const validatingSchema = require('./erc20.request-schema');
const validatorQuery = require("app/middleware/validator.query.middleware");
const validatorParam = require("app/middleware/validator.param.middleware");

route.get("/erc20/plans",
  authenticate,
  validatorQuery(validatingSchema.allPlans),
  controller.getAllPlans
);

route.get("/erc20/deposits",
  authenticate,
  validatorQuery(validatingSchema.checkGetDeposit),
  controller.getDeposit
);
route.get("/erc20/history",
  authenticate,
  validatorQuery(validatingSchema.checkGetDeposit),
  controller.getHistoryOfAddress
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
 *       - in: path
 *         name: status
 *         description: Status of plans, it is `all`, `active` or `deactive` (ommit is all).
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok 
 *         examples:
 *           application/json:
 *             {
 *                 "data": [{
                        "staking_plan_code": "plan-001",
                        "duration": 10,
                        "duration_type": "YEAR",
                        "reward_per_year": "6.930",
                        "actived_flg": false
                    },
                    {
                        "staking_plan_code": "plan-002",
                        "duration": 101,
                        "duration_type": "DAY",
                        "reward_per_year": "2.230",
                        "actived_flg": true
                    },]
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

/**
 * @swagger
 * /api/v1/erc20/deposits:
 *   get:
 *     summary: Get deposits of a depositor
 *     tags:
 *       - erc20
 *     description: Get deposits of a depositor
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: query
 *         name: deposit_id
 *         description: Id of a deposit.
 *       - in: query
 *         name: depositor_address
 *         description: Address of a depositor.
 *       - in: query
 *         name: token_address
 *         description: Address of a token.
 *       - in: query
 *         name: memo
 *         description: Memo a deposit.
 *       - in: query
 *         name: offset
 *         description: Offset of data for pagination.
 *       - in: query
 *         name: limit
 *         description: Limit of data for pagination.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok 
 *         examples:
 *           application/json:
 *             {
                  "data": [
                    {
                        "block_number": "7039071",
                        "block_hash": "0x514b22f8ffcb7e39bb86cd0efe5f5735ecc9e09d34066fcb41c03e7c50118ab4",
                        "transaction_index": "0",
                        "deposit_id": "5",
                        "token_addr": "0x90A537b2904f47d958f8340B128c06b3768153BC",
                        "depositor_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36",
                        "amount": "1000",
                        "duration": "300",
                        "memo": "plan1-10",
                        "withdraw": null
                    },
                    {
                        "block_number": "7039055",
                        "block_hash": "0xa54727ba8fe5d052cdd1be29a160735cc30451cb6c1dcb5f0259a300c886b3b6",
                        "transaction_index": "10",
                        "deposit_id": "0",
                        "token_addr": "0x90A537b2904f47d958f8340B128c06b3768153BC",
                        "depositor_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36",
                        "amount": "1000",
                        "duration": "900",
                        "memo": "plan1-10",
                        "withdraw": {
                            "block_number": "7039768",
                            "blockHash": "0x16f3fd2bc9022886f281e59b0c0cee9d47dc21749ef0f80eb99a7b1493d3b3a3",
                            "transactionIndex": "99",
                            "transactionHash": "0x360f30ccb991021aef7bb88684172c7fb5229b17d02c65be6eead85e7bda3311",
                            "logIndex": "19",
                            "depositId": "0",
                            "token_addr": "0x90A537b2904f47d958f8340B128c06b3768153BC",
                            "depositor_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36",
                            "recipient_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36",
                            "amount": "1000"
                        }
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

/**
 * @swagger
 * /api/v1/erc20/history:
 *   get:
 *     summary: Get history of a depositor that includes deposit and withdraw information.
 *     tags:
 *       - erc20
 *     description: Get history of a depositor that includes deposit and withdraw information.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: query
 *         name: depositor_address
 *         description: Address of a depositor.
 *       - in: query
 *         name: token_address
 *         description: Address of a token.
 *       - in: query
 *         name: offset
 *         description: Offset of data for pagination.
 *       - in: query
 *         name: limit
 *         description: Limit of data for pagination.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok 
 *         examples:
 *           application/json:
 *             {
                  "data": [
                    {
                      "block_number": "7039768",
                      "block_hash": "0x16f3fd2bc9022886f281e59b0c0cee9d47dc21749ef0f80eb99a7b1493d3b3a3",
                      "transaction_hash": "0x360f30ccb991021aef7bb88684172c7fb5229b17d02c65be6eead85e7bda3311",
                      "transaction_index": "99",
                      "log_index": "19",
                      "deposit_id": "0",
                      "token_addr": "0x90A537b2904f47d958f8340B128c06b3768153BC",
                      "depositor_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36",
                      "recipient_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36",
                      "amount": "1000",
                      "type": "withdraw"
                    },
                    {
                      "block_number": "7039071",
                      "block_hash": "0x514b22f8ffcb7e39bb86cd0efe5f5735ecc9e09d34066fcb41c03e7c50118ab4",
                      "transaction_hash": "0xc2643cb1e646283151875ed21d6db42ba109f9c71e040a77e2515e807727c193",
                      "transaction_index": "0",
                      "log_index": "2",
                      "deposit_id": "5",
                      "token_addr": "0x90A537b2904f47d958f8340B128c06b3768153BC",
                      "depositor_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36",
                      "recipient_addr": "",
                      "amount": "1000",
                      "type": "deposit"
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
