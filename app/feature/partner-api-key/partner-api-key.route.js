const express = require("express");
const controller = require("./partner-api-key.controller");
const { create } = require("./validator");
const validator = require("app/middleware/validator.middleware");
const authenticate = require('app/middleware/authenticate.middleware');
const route = express.Router();

route.get("/partners/:id/keys",
    authenticate,
    controller.getAll
);

route.post("/partners/:id/keys",
    validator(create),
    authenticate,
    controller.create
);

module.exports = route;

/**
 * @swagger
 * /api/v1/partners/{id}/keys:
 *   get:
 *     summary: get list of all API key
 *     tags:
 *       - API key
 *     description: get list of all API key
 *     parameters:
 *       - name: id
 *         in: path
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
                    "data": {
                        "items": [
                            {
                                "id": "60bd0a85-cc4b-4a36-bc36-48b950b688fd",
                                "partner_id": "8f3d8b76-7915-493c-88f2-94ee074a56f2",
                                "name": "INF",
                                "api_key": "0946b0e4-f010-4270-81ec-2ac6bf64c0e3",
                                "secret_key": "y6D9XnAeLlGE9dKPwgLFnwO37NMr1xzj",
                                "status": "CONNECTED",
                                "actived_flg": true,
                                "created_by": 83,
                                "createdAt": "2020-03-05T09:45:20.394Z",
                                "updatedAt": "2020-03-23T09:08:31.013Z",
                                "partner_updated_by": "60bd0a85-cc4b-4a36-bc36-48b950b688fd"
                            },
                            {
                                "id": "57d8ea98-440f-4a3b-88f0-4a61a0a3350b",
                                "partner_id": "8f3d8b76-7915-493c-88f2-94ee074a56f2",
                                "name": "Phinek",
                                "api_key": "8228aa97-47f9-4f82-8616-af96822ff5d7",
                                "secret_key": "PKQBZxjN31D6qo3NnNKHmQREXAL6d7Wq",
                                "status": "NOT_CONNECT",
                                "actived_flg": true,
                                "created_by": 75,
                                "createdAt": "2020-02-27T11:19:03.654Z",
                                "updatedAt": "2020-02-27T11:19:03.654Z",
                                "partner_updated_by": "60bd0a85-cc4b-4a36-bc36-48b950b688fd"
                            }
                        ],
                        "offset": 0,
                        "limit": 10,
                        "total": 2
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

/**
* @swagger
* /api/v1/partners/{id}/keys:
*   post:
*     summary: create a new API key
*     tags:
*       - API key
*     description: create a new API key
*     parameters:
*       - name: id
*         in: path
*         type: string
*         required: true
*       - in: body
*         name: data
*         description: Info of new API key
*         schema:
*            type: object
*            required:
*            - name
*            example:
*               {
                       name: "MYHN"
                 }
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Ok
*         examples:
*           application/json:
*             {
                   "data": {
                       "id": "024625de-afe6-439b-bfd6-784135931ef5",
                       "api_key": "27572536-9260-4ffd-908a-eede3eee775f",
                       "status": "NOT_CONNECT",
                       "partner_id": "8f3d8b76-7915-493c-88f2-94ee074a56f2",
                       "name": "MYHN",
                       "secret_key": "4dE8voPBVgv4rOxNb9zTL0lRMDQKb5k9",
                       "actived_flg": true,
                       "created_by": 1,
                       "updatedAt": "2020-03-24T04:12:33.677Z",
                       "createdAt": "2020-03-24T04:12:33.677Z",
                       "partner_updated_by": "024625de-afe6-439b-bfd6-784135931ef5"
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