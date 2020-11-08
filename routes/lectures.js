var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const YearSchema = require('../models/year');
const Year9 = mongoose.model("Year9", YearSchema);

const bodyParser = require("body-parser");
const yearSchema = require('../models/year');

/* GET home page. */
router.get('/:year', async function (req, res, next) {
  console.log(req.params.year);
  var lectures;
  switch (req.params.year) {
    case "year9": lectures = await Year9.find();

  }

  console.log(lectures)

  res.render('lectures', { lectures });


  res.render('lectures');
  // res.sendFile('lectures.ejs', {root: './views'});
});

router.post('/', async function (req, res, next) {
  const keys = Object.keys(req.body);
  console.log(keys[0]);

  var lectures;

  switch (keys[0]) {
    case "year9": lectures = await Year9.find();

  }

  console.log(lectures)

  res.render('lectures', { lectures });
});


module.exports = router;
