const express = require('express');
const validator = require('app/middleware/validator.middleware');
const { create, update } = require('./validator');
const controller = require('./partner-request.controller');
const authenticate = require('app/middleware/authenticate.middleware');

const router = express.Router();

router.post(
    '/partners/:partner_id/commissions/:commission_id/requests',
    authenticate,
    validator(create),
    controller.create
);
router.put(
    '/partners/:partner_id/commissions/:commission_id/requests/:id',
    authenticate,
    validator(update),
    controller.update
);
  
module.exports = router;

/*********************************************************************/
  
/**
 * @swagger
 * /api/v1/partners/{partner_id}/commissions/{commission_id}/requests:
 *   post:
 *     summary: create request change reward address
 *     tags:
 *       - Requests
 *     description:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: path
 *         name: partner_id
 *         type: string
 *         required: true
 *       - in: path
 *         name: commission_id
 *         type: string
 *         required: true
 *       - in: body
 *         name: data
 *         description: Data for update.
 *         schema:
 *            type: object
 *            required:
 *            - reward_address
 *            - link
 *            - email_confirmed
 *            example:
 *               {     
                    "reward_address": "iaa16se3zaex588aqa6e0mgnps92a005mjm95d56jx",
                    "link": "http://localhost",
                    "email_confirmed": "master@moonstake.com"
                }
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Ok
*         examples:
*           application/json:
*             {
*                 "data": "OWY4YzBlOTgtZmY5NS00M2Y1LTk4M2YtY2M0MzAzNjRlNDFi"
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
 * /api/v1/partners/{partner_id}/commissions/{commission_id}/requests/{id}:
 *   put:
 *     summary: update request change reward address
 *     tags:
 *       - Requests
 *     description:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer {token}
 *       - in: path
 *         name: partner_id
 *         type: string
 *         required: true
 *       - in: path
 *         name: commission_id
 *         type: string
 *         required: true
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *       - in: body
 *         name: data
 *         description: Data for update.
 *         schema:
 *            type: object
 *            required:
 *            - status
 *            - token
 *            example:
 *               {     
                    "status": 2,
                    "token": "OWY4YzBlOTgtZmY5NS00M2Y1LTk4M2YtY2M0MzAzNjRlNDFi"
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