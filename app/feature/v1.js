const express = require('express');
const router = express.Router();

router.use(require("./authentication/authentication.route"));
router.use(require("./tracking-voting/tracking-voting.route"));
router.use(require("./platform-vote/platform-vote.route"));
router.use(require("./partner-commission/partner-commission.route"));
router.use(require("./grandchild/grandchild.route"));
router.use(require("./partner-api-key/partner-api-key.route"));

// Erc20 routes
router.use(require("./erc20/plan/plan.route"));
router.use(require("./erc20/deposit/erc20.route"));

module.exports = router;
