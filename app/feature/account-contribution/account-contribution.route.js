const express = require("express");
const controller = require("./account-contribution.controller");
const requestSchema = require("./account-contribution.request-schema");
const validator = require("app/middleware/validator.middleware");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();

route.get("/accountcontribution/:symbol",
  authenticate,
  controller.get
)

route.post("/accountcontribution/:symbol",
  validator(requestSchema),
  authenticate,
  controller.set
)




/*********************************************************************/

/**
 * @swagger
 * /api/v1/accountcontribution/{symbol}:
 *   get:
 *     summary: get list of account contribute, symbols [ATOM, IRIS, ONT]
 *     tags:
 *       - Account contribution
 *     description: get list of account contribute 
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: path
 *         name: symbol
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

 /**
 * @swagger
 * /api/v1/accountcontribution/{symbol}:
 *   post:
 *     summary: update contribution status, symbols [ATOM, IRIS, ONT]
 *     tags:
 *       - Account contribution
 *     description: Voting
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: path
 *         name: symbol
 *         type: string
 *         required: true
 *       - in: body
 *         name: ids
 *         description: Data for login.
 *         schema:
 *            type: object
 *            required: 
 *            example: 
 *               {
 *                  ids: ['id']
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