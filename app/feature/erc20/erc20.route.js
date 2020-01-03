const express = require("express");
const controller = require("./erc20.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();
const validatorQuery = require("app/middleware/validator.query.middleware");
const validatingSchema = require('./erc20.request-schema');

route.get("/erc20/plans",
  authenticate,
  validatorQuery(validatingSchema.allPlans),
  controller.getAllPlans
);

route.get("/erc20/deposit/:id",
  authenticate,
  validatorQuery(validatingSchema.checkDepositId),
  controller.getDepositById
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
 * /api/v1/erc20/deposit/{id}:
 *   get:
 *     summary: Get a deposit
 *     tags:
 *       - erc20
 *     description: Get deposit detail
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: path
 *         name: id
 *         description: Id of a deposit.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok 
 *         examples:
 *           application/json:
 *             {
 *                 "data": {
                      "block_number": "7039055",
                      "block_hash": "0xa54727ba8fe5d052cdd1be29a160735cc30451cb6c1dcb5f0259a300c886b3b6",
                      "transaction_index": "10",
                      "log_index": "2",
                      "deposit_id": "0",
                      "token_addr": "0x90A537b2904f47d958f8340B128c06b3768153BC",
                      "depositor_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36",
                      "amount": "1000",
                      "duration": "900",
                      "memo": "plan1-10",
                      "withdraw": {
                          "block_number": "7039768",
                          "block_hash": "0x16f3fd2bc9022886f281e59b0c0cee9d47dc21749ef0f80eb99a7b1493d3b3a3",
                          "transaction_index": "99",
                          "deposit_id": "0",
                          "token_addr": "0x90A537b2904f47d958f8340B128c06b3768153BC",
                          "depositor_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36",
                          "amount": "1000",
                          "recipient_addr": "0x2F0036792DF25362a2DE0Bab82B4798657B4BC36"
                      }
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
