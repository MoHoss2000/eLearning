var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('error', {message: req.query.message})
});

module.exports = router;
