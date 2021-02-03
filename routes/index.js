const express = require("express");
const router = express.Router();
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
let moment = require("moment");
const ONUL = "2021-01-27";
let TOTALDEFCOUNT = 7152;

function calculateSeq() {
  let count = moment().diff(moment(ONUL), "days") * 19;
  if (TOTALDEFCOUNT == 7152) {
    TOTALDEFCOUNT += count;
  }
  console.log("count:", TOTALDEFCOUNT);
  return TOTALDEFCOUNT;
}

/* GET home page. */
router.get("/", (req, res, next) => {
  let today = moment().format("YYYYMM");
  const todaySelect = `SELECT * FROM covid${today} WHERE gubun = '합계'`;
  // dbconn.query();
  res.render("index.html");
});

module.exports = router;
