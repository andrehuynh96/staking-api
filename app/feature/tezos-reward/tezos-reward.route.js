const express = require('express');
const controller = require("./tezos-reward.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const router = express.Router();

router.get('/tezos-rewards',
  authenticate,
  controller.get
);

module.exports = router;

/*********************************************************************/

/**
 * @swagger
 * /api/v1/tezos-rewards:
 *   get:
 *     summary: tezos rewards
 *     tags:
 *       - Reward
 *     description: Reward
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: query
 *         name: address
 *         type: string
 *         required: true
 *       - in: query
 *         name: date
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
