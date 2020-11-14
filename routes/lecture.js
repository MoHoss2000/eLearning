var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
const { Year9, Year10, Year11, Year12 } = require('../models/year');
const mongoose = require("mongoose");
var CodeGenerator = require("node-code-generator")
const { Code } = require('bson');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('lecture');
});



module.exports = router;
