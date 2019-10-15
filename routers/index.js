const { Router } = require('express');
const Controller = require('../controllers/controllers.js');

/**
 * Config router
 */
class Config {
    constructor(app){
        var router = Router();
        var ctrl = new Controller();

        router.get('/staking/:platform/validators/', ctrl.getValidators.bind(ctrl));
        router.get('/staking/:platform/addr/:addr/delegations/', ctrl.getDelegations.bind(ctrl));
        router.post('/staking/:platform/tx/send', ctrl.sendTransaction.bind(ctrl));
        return router;
    };
}
module.exports = Config;
