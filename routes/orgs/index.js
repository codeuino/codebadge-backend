var express = require('express');
var router = express.Router();
const githubAPI = require('./githubAPI');

/* GET users listing. */
router.use('/github',githubAPI);
module.exports = router;
