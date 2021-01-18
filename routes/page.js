// page routing 할 곳
const express = require("express");
const router = express.Router();

router.get("/covidStatus", (req, res, next) => {
  res.render("covidStatus", { title: "WIWY" });
});

router.get("/city", (req, res, next) => {
  res.render("city");
});

router.get("/confirmedMovement", (req, res, next) => {
  res.render("confirmedMovement");
});

module.exports = router;
