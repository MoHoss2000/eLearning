var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lectures');
  // res.sendFile('lectures.ejs', {root: './views'});
});

router.post('/', function(req, res, next) {
  console.log("sa");
  res.render('lectures');
  // res.sendFile('lectures.ejs', {root: './views'});
});


module.exports = router;
