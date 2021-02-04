const express = require("express");
const router = express.Router();
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
let moment = require("moment");
const calculateSeq = require("../conf/calculateSeq");
const funcConv = require("../conf/funcConv");

/* GET home page. */
router.get("/", (req, res, next) => {
  let today = moment().format("YYYYMM");
  const seqNum = calculateSeq();
  const todaySelect = `SELECT * FROM covid${today} WHERE gubun = '합계' and seq >= '${seqNum}'`;
  // dbconn.query(todaySelect, (error, results, fields) => {
  //   res.render("index.html", {
  //     defCnt: funcConv.defCntConv(results),
  //     incDec: funcConv.incDecConv(results),
  //     localOccCnt: funcConv.localOccCntConv(results),
  //     overFlowCnt: funcConv.overFlowCntConv(results),
  //     isolClearCnt: funcConv.isolClearCntConv(results),
  //     isolIngCnt: funcConv.isolIngCntConv(results),
  //     deathCnt: funcConv.deathCntConv(results),
  //   });
  // });
  res.render("index.html", { title: "WIWY" });
});

module.exports = router;
