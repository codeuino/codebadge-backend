var express = require('express');
var router = express.Router();
const githubAPI = require('./githubAPI');

router.use('/github',githubAPI);
module.exports = router;
