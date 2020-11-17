var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const yearSchema = require('../models/year');
const { Year9, Year10, Year11, Year12 } = require('../models/year');

async function getLectures(year) {
  switch (year) {
    case "year9": lectures = await Year9.find(); break;
    case "year10": lectures = await Year10.find(); break;
    case "year11": lectures = await Year11.find(); break;
    case "year12": lectures = await Year12.find(); break;
  }

  lectures = lectures.map(obj => {
    let rObj = {};
    rObj['_id'] = obj._id;
    rObj['link'] = obj.link;
    rObj['time'] = obj.time;
    rObj['name'] = obj.name;
    return rObj;
  });

  return lectures;
}

/* GET home page. */
router.get('/:year', async function (req, res, next) {
  var lectures = await getLectures(req.params.year);

  res.render('lectures', { lectures, error: "" });
});

router.get('/:year/:error', async function (req, res, next) {
  var lectures = await getLectures(req.params.year);

  res.render('lectures', { lectures, error: req.params.error });

});

router.post('/:year/:id', async function (req, res, next) {
  var id = req.params.id;
  var code = req.body.code;
  var lecture;
  var uuid = req.body.uuid;
  console.log(uuid);

  switch (req.params.year) {
    case "year9": lecture = await Year9.findById(id); break;
    case "year10": lecture = await Year10.findById(id); break;
    case "year11": lecture = await Year11.findById(id); break;
    case "year12": lecture = await Year12.findById(id); break;
  }

  var link = lecture.link;

  var codes = [3];
  codes = lecture.codes;
  var codeFound = false;

  codes.forEach(function (object, index) {

    if (object._id == code) {
      time = lecture.time;
      timeStarted = object.timeUsed;

      Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
      }

      var expiryTime = new Date(timeStarted.getTime());
      expiryTime.addHours(time);

      console.log(expiryTime);
      // expiryTime.addHours(time);

      expired = Date.now() > expiryTime ? true : false;

      codeFound = true;

      if (object.used == true && expired) {
        return res.redirect(`/error?message=الكود منتهي`);
      } else if (object.used == true && !expired) {
        if (uuid != object.uuid)
          return res.redirect(`/error?message=لا يمكن استخدام الكود على هذا الجهاز`)
      } else {
        object.uuid = uuid;
        object.used = true;
        object.timeUsed = new Date();
        expiryTime = new Date().addHours(time);
      }

      remainingTime = expiryTime - Date.now();


    }


  })

  await lecture.updateOne({ $set: { codes: codes } });

  console.log(typeof remainingTime)
  console.log(codeFound);

  if (typeof remainingTime !== 'undefined' && codeFound) {
    res.render('lecture', { remainingTime: remainingTime, link })
  } else if(!codeFound && typeof remainingTime === 'undefined'){
    res.redirect(`/error?message=الكود غير صحيح`) 
  }

});


module.exports = router;
