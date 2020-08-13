const express = require("express");
const controller = require("./validator.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();

route.get("/validator",
    authenticate,
    controller.get
);

module.exports = route;

/*********************************************************************/
/**
 * @swagger
 * /api/v1/validator:
 *   get:
 *     summary: get validator info
 *     tags:
 *       - Validator
 *     description: get validator info
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token} 
 *       - name: platform
 *         in: query
 *         type: string
 *         required: true
 *       - name: validator_address
 *         in: query
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
                    "data": {
                        "total_stake": 4313928.685523,
                        "rolls": 539,
                        "uptime": "",
                        "rolls_share": "",
                        "cumulative_share": "",
                        "missed_blocks": ""
                    }
                }
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