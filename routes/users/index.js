const express = require('express');
const router = express.Router();
const codebadgeLocalAPI = require('./codebadge-local');

router.use('/codebadge',codebadgeLocalAPI);

module.exports = router;