const express = require("express");
const controller = require("./partner.controller");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();

route.get("/me",
    authenticate,
    controller.get
);

module.exports = route;

/*********************************************************************/
/**
 * @swagger
 * /api/v1/me:
 *   get:
 *     summary: get partner info
 *     tags:
 *       - Partner
 *     description: get partner info
 *     parameters:
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
                    "data": {
                        "id": "ed483de6-2d14-11ea-978f-2e728ce88125",
                        "email": "phith1@blockchainlabs.asia",
                        "name": "Infinito",
                        "parent_id": "ed483de6-2d14-11ea-978f-2e728ce88125",
                        "partner_type": "CHILD",
                        "actived_flg": true,
                        "deleted_flg": false,
                        "created_by": 0,
                        "updated_by": 73,
                        "createdAt": "2020-03-05T11:22:04.602Z",
                        "updatedAt": "2020-03-30T08:50:24.064Z"
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