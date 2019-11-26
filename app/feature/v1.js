const express = require('express');
const router = express.Router();

router.use(require("./authentication/authentication.route"));

module.exports = router;
