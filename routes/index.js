var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('https://github.com/bobby3501/TpLinkApi/blob/master/README.md')
});

router.get('/secretCat', function(req, res, next) {
  var uri = encodeURI("https://thewondrous.com/wp-content/uploads/2015/02/funny-cat-captions.jpg");
  res.contentType('text/html');
  console.log(uri)
  res.write('<img src="' + uri +'">');
  res.end()
});

module.exports = router;
