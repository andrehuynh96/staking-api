const express = require('express');
const router = express.Router();

router.use(require("./authentication/authentication.route"));
router.use(require("./tracking-voting/tracking-voting.route"));
router.use(require("./platform-vote/platform-vote.route"));
router.use(require("./partner-commission/partner-commission.route"));

module.exports = router;
