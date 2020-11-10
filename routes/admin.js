var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', verifyToken, function (req, res, next) {
  res.render('admin');
});

function verifyToken(req, res, next) {
  let accessToken = req.cookies.jwt
  console.log(accessToken)
  if (!accessToken) {
    res.redirect('/login');
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    next();
  }
  catch (e) {
    res.redirect('login');
  }
}


module.exports = router;
