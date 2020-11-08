var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");



const bodyParser = require("body-parser");
const yearSchema = require('../models/year');
const {Year9, Year10, Year11, Year12} = require('../models/year');

/* GET home page. */
router.get('/:year', async function (req, res, next) {
  console.log(req.params.year);
  var lectures;
  switch (req.params.year) {
    case "year9": lectures = await Year9.find(); break;
    case "year10": lectures = await Year10.find(); break;
    case "year11": lectures = await Year11.find(); break;
    case "year12": lectures = await Year12.find(); break;
  }

  console.log(lectures)

  res.render('lectures', { lectures });
});

module.exports = router;
