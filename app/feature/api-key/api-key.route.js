const express = require("express");
const controller = require("./api-key.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();

route.get("/api-key/revoke",
  authenticate,
  controller.revokeAPIKey
)


/*********************************************************************/

/**
 * @swagger
 * /api/v1/api-key/revoke:
 *   get:
 *     summary: revoke API key
 *     tags:
 *       - API Key
 *     description: revoke API key
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok 
 *         examples:
 *           application/json:
 *             {
 *                 "data":true
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