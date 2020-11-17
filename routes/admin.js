var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
const { Year9, Year10, Year11, Year12 } = require('../models/year');
const mongoose = require("mongoose");
var CodeGenerator = require("node-code-generator")
const { Code } = require('bson');


/* GET home page. */
router.get('/', verifyToken, function (req, res, next) {
  res.redirect('/admin/year9')
});

router.get('/:year', verifyToken, async function (req, res, next) {
  var lectures;
  switch (req.params.year) {
    case "year9": lectures = await Year9.find(); break;
    case "year10": lectures = await Year10.find(); break;
    case "year11": lectures = await Year11.find(); break;
    case "year12": lectures = await Year12.find(); break;
  }

  res.render('admin', { lectures: lectures, year: req.params.year });
});

router.post('/add', verifyToken, async function (req, res, next) {
  var name = req.body.name;
  var link = req.body.link;
  var grade = req.body.grade;
  var time = req.body.time;
  var codeNo = req.body.codes;

  var codes = generateCodes(codeNo);

  newLecture = {
    name: name,
    link: link,
    codes: codes,
    time: time,
  }

  redirectPath = "";
  try {
    switch (grade) {
      case "الصف الثالث الاعدادي": redirectPath = "year9"; await Year9.create(newLecture); break;
      case "الصف الأول الثانوي": redirectPath = "year10"; await Year10.create(newLecture); break;
      case "الصف الثاني الثانوي": redirectPath = "year11"; await Year11.create(newLecture); break;
      case "الصف الثالث الثانوي": redirectPath = "year12"; await Year12.create(newLecture); break;
    }

    res.redirect(`/admin/${redirectPath}`);
  }
  catch (e) {
    res.status(401).send();
  }

});

router.post('/delete/:year/:id', verifyToken, async function (req, res, next) {
  var grade = req.params.year;
  var id = req.params.id;
  var redirectPath = "";
  try {

    switch (grade) {
      case "year9": redirectPath = "year9"; await Year9.findByIdAndDelete(id); break;
      case "year10": redirectPath = "year10"; await Year10.findByIdAndDelete(id); break;
      case "year11": redirectPath = "year11"; await Year11.findByIdAndDelete(id); break;
      case "year12": redirectPath = "year12"; await Year12.findByIdAndDelete(id); break;
    }

    res.redirect(`/admin/${redirectPath}`);
  }
  catch (e) {
    res.status(401).send();
  }
});

router.post('/update/:year/:id', verifyToken, async function (req, res, next) {
  var grade = req.params.year;
  var id = req.params.id;
  var redirectPath = "";

  var name = req.body.name;
  var link = req.body.link;
  var time = req.body.time;

  try {
    switch (grade) {
      case "year9": redirectPath = "year9"; await Year9.findByIdAndUpdate(id, { name: name, link: link, time: time }, { useFindAndModify: false }); break;
      case "year10": redirectPath = "year10"; await findByIdAndUpdate(id, { name: name, link: link, time: time }, { useFindAndModify: false }); break;
      case "year11": redirectPath = "year11"; await Year11.findByIdAndUpdate(id, { name: name, link: link, time: time }, { useFindAndModify: false }); break;
      case "year12": redirectPath = "year12"; await Year12.findByIdAndUpdate(id, { name: name, link: link, time: time }, { useFindAndModify: false }); break;
    }

    res.redirect(`/admin/${redirectPath}`);
  }
  catch (e) {
    res.status(401).send();
  }
});

router.post('/code/:year/:id', verifyToken, async function (req, res, next) {
  var grade = req.params.year;
  var id = req.params.id;
  var code = req.body.code;
  var lecture;

  try {
    switch (grade) {
      case "year9": lecture = await Year9.findById(id); break;
      case "year10": lecture = await Year10.findById(id); break;
      case "year11": lecture = await Year11.findById(id); break;
      case "year12": lecture = await Year12.findById(id); break;
    }

    // var codes = [1];
    var codes = lecture.codes;

    var found = codes.find(function (element) {
      return element._id == code;
    });

    if (found == undefined)
      // return res.status(300).send('Code not found');
      return res.status(201).json({
        message: "Code not found"
      })

    res.status(200).json({
      message: "Success",
      used: found.used
    })

  }
  catch (e) {
    res.status(401).send();
  }
});

router.post('/updateCode/:year/:id', verifyToken, async function (req, res, next) {
  var grade = req.params.year;
  var id = req.params.id;

  var code = req.body.code;
  var used = req.body.used;
  var redirectPath = "";

  console.log(`${code}   ${used}`)

  try {
    switch (grade) {
      case "year9": redirectPath="year9"; lecture = await Year9.findById(id); break;
      case "year10": redirectPath="year10"; lecture = await Year10.findById(id); break;
      case "year11": redirectPath="year11"; lecture = await Year11.findById(id); break;
      case "year12": redirectPath="year12";  lecture = await Year12.findById(id); break;
    }

    // var codes = [1]
    var codes = lecture.codes;

    var index = codes.findIndex(function (element) {
      return element._id == code;
    });

    codes[index].used = used;

    await lecture.updateOne({ $set: { codes: codes } });
    
    res.redirect(`/admin/${redirectPath}`);
  }
  catch (e) {
    res.status(401).send();
  }
});


function verifyToken(req, res, next) {
  let accessToken = req.cookies.jwt
  if (!accessToken) {
    res.redirect('/login');
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    next();
  }
  catch (e) {
    res.redirect('/login');
  }
}

function generateCodes(n) {
  var generator = new CodeGenerator();
  var pattern = '*******';
  var howMany = n;
  // Generate an array of random unique codes according to the provided pattern:
  codes = generator.generateCodes(pattern, howMany, {});

  arr = []
  for (x in codes) {
    arr.push({ _id: codes[x] });
  }
  return arr;
}

module.exports = router;
