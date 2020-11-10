var express = require('express');
var router = express.Router();

const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/', function (req, res) {
  res.render('login');
})

router.post('/', async function (req, res) {
  var user = req.body.username;
  let pass = req.body.password;

  let admins = await Admin.find();
  let admin = admins[0];

  if (!user || !pass || user != admin._id || pass != admin.password) {
    return res.status(401).send();
  }

  payload = {};

  let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: '3h'
  })

  //send the access token to the client inside a cookie
  res.cookie("jwt", accessToken, { secure: false, httpOnly: true });
  res.redirect('/admin')
})

// function verifyToken(req, res, next) {
//   let accessToken = req.cookies.jwt
//   console.log(accessToken)
//   if (!accessToken) {
//     res.redirect('login');
//   }

//   let payload;
//   try {
//     payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
//     res.redirect('admin');
//     next();
//   }
//   catch (e) {
//     res.redirect('login');
//   }
// }



module.exports = router;
