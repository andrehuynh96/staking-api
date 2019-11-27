const express = require("express");
const controller = require("./tracking-voting.controller");
const requestSchema = require("./tracking-voting.request-schema");
const validator = require("app/middleware/validator.middleware");
const authenticate = require('app/middleware/authenticate.middleware');
const verifySignature = require("app/middleware/verify-signature.middleware");
const route = express.Router();

route.post("/voting",
  validator(requestSchema),
  authenticate,
  verifySignature,
  controller
)


/*********************************************************************/

/**
 * @swagger
 * /api/v1/voting:
 *   post:
 *     summary: tracking voting
 *     tags:
 *       - Voting
 *     description: Voting
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: header
 *         name: x-signature
 *         type: string
 *         required: true
 *         description: signature
 *       - in: header
 *         name: x-time
 *         type: string
 *         required: true
 *         description: 1574827292
 *       - in: body
 *         name: data
 *         description: Data for login.
 *         schema:
 *            type: object
 *            required: 
 *            example: 
 *               {
                        "tx_id":"3f76680510bcca07e7e011dcc1effb079d1d0a34",
                        "platform":"ATOM"
                  } 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok 
 *         examples:
 *           application/json:
 *             {
 *                 "data": true
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