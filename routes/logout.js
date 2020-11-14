var express = require('express');
var router = express.Router();

const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/', function (req, res) {
  res.clearCookie('jwt');
  res.redirect('/');
})


module.exports = router;
