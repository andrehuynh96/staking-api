const express = require("express");
const controller = require("./erc20.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();
const validatingSchema = require('./erc20.request-schema');
const validatorQuery = require("app/middleware/validator.query.middleware");

route.get("/erc20/plans",
  authenticate,
  validatorQuery(validatingSchema.allPlans),
  controller.getAllPlans
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
