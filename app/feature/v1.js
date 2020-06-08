const express = require('express');
const router = express.Router();

router.use(require("./authentication/authentication.route"));
router.use(require("./tracking-voting/tracking-voting.route"));
router.use(require("./platform-vote/platform-vote.route"));
router.use(require("./partner-commission/partner-commission.route"));
router.use(require("./grandchild/grandchild.route"));
router.use(require("./api-key/api-key.route"));
router.use(require("./partner-api-key/partner-api-key.route"));
router.use(require("./partner-tx-memo/partner-tx-memo.route"));
router.use(require("./partner/partner.route"));

// Erc20 routes
router.use(require("./erc20/plan/plan.route"));
router.use(require("./erc20/deposit/erc20.route"));
router.use(require("./partner-request/partner-request.route"));

module.exports = router;
