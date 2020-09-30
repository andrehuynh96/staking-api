const express = require('express');
const controller = require("./tezos-reward.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const router = express.Router();

router.get('/tezos-rewards/:address',
    authenticate,
    controller.get
);

module.exports = router;

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
 *       - in: path
 *         name: address
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
 *                 "data": 0
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
