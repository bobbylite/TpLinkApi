var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('https://github.com/bobby3501/TpLinkApi/blob/master/README.md')
});

module.exports = router;
