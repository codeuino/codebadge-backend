const express = require('express');
const router = express.Router();
const codebadgeLocalAPI = require('./codebadge-local');
const githubAPI = require('./githubAPI');

router.use('/github',githubAPI);
router.use('/codebadge',codebadgeLocalAPI);

module.exports = router;