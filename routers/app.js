var express = require("express");
var path = require("path");
var router = express.Router();

// Character's page
router.get("/character/:id", function (req, res) {
  res.sendFile(path.join(__dirname + "./../public/character.html"));
});

//Allies's page
router.get("/allies", function (req, res) {
  res.sendFile(path.join(__dirname + "./../public/allies.html"));
});

// Home page
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "./../public/index.html"));
});

module.exports = router;
