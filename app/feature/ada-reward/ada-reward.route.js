const express = require('express');
const controller = require("./ada-reward.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const router = express.Router();

router.post('/ada-rewards',
  authenticate,
  controller.get
);

module.exports = router;

/*********************************************************************/

/**
 * @swagger
 * /api/v1/ada-rewards:
 *   post:
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
 *       - in: body
 *         name: data
 *         description: Data for login.
 *         required: true
 *         schema:
 *            type: object
 *            required:
 *            - api_key
 *            example:
 *               {
                        "address":["addr1q8jshaxmyrgua3wl8p0pk88632rsd6g6aac8fccxg55t8vzmmsndrmkvnew5h7m9tatjyzudmz3rg6a8jsqhnthzd7qsa6awfz"],
                        "date":"2020-11-19 10:23:42",
                        "cycle_distribute": 230,
                  }
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
