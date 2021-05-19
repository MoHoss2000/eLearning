var express = require("express");
var router = express.Router();

const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
var secret = "swsh23hjddnns";

/* GET home page. */
router.get("/", verifyToken, function (req, res) {
  res.render("login", { error: "" });
});

router.post("/", async (req, res) => {
  try {
    var username = req.body.username;
    let password = req.body.password;

    let admin = await Admin.findOne({ _id: username });

    if (
      !username ||
      !password ||
      username != admin._id ||
      password != admin.password
    ) {
      return res.render("login", { error: "Invalid username/password" });
    }

    const payload = {};

    let accessToken = jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: "3h",
    });

    // send the access token to the client inside a cookie
    res.cookie("jwt", accessToken, {
      secure: false,
      httpOnly: true,
      expires: new Date(Date.now() + 10800000),
    });

    res.redirect("/admin");
  } catch (e) {
    console.log(e.message);
  }
});

function verifyToken(req, res, next) {
  let accessToken = req.cookies.jwt;

  if (!accessToken) {
    return next();
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, secret); //process.env.ACCESS_TOKEN_SECRET)
    res.redirect("admin");
  } catch (e) {
    next();
  }
}

module.exports = router;
