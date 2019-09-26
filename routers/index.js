const { Router } = require('express');
const Controller = require('../controllers/controllers.js');

/**
 * Config router
 */
class Config {
    constructor(app){
        var router = Router();
        var ctrl = new Controller();

        router.get('/validators/:platform', ctrl.getValidators.bind(ctrl));
        return router;
    };
}
module.exports = Config;
