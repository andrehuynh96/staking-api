const express = require('express');
const controller = require("./ada-reward.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const router = express.Router();

router.get('/ada-rewards',
  authenticate,
  controller.get
);

module.exports = router;

/*********************************************************************/

/**
 * @swagger
 * /api/v1/ada-rewards:
 *   get:
 *     summary: ada rewards
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
 *                 "data":[
 *                      {
 *                         "address":"",
 *                         "amount": 100
 *                      }
 *                 ]
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
