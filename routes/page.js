// page routing 할 곳
const express = require("express");
const router = express.Router();
let logger = require("../conf/winston");
let moment = require("moment");
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
const checkUpdate = require("../conf/checkUpdLog");
const funcConv = require("../conf/funcConv");
const calculateSeq = require("../conf/calculateSeq");

router.get("/main", (req, res, next) => {
  res.render("main", {
    title: "WIWY",
  });
});

router.get("/api", (req, res, next) => {
  const currentMon = moment().format("YYYYMM");
  const selectAll = `SELECT * FROM covid${currentMon}`;
  dbconn.query(selectAll, (error, covidData, fields) => {
    res.json(covidData);
  });
});

router.get("/covidStatus", (req, res, next) => {
  let curMonth = moment().format("YYYYMM");
  let dailyCovidSql = "";
  let cityCovidSql = "";
  const seqNum = calculateSeq();
  let checkDay = moment().format("DD");
  if (checkDay <= "06") {
    let lastMonth = moment().subtract("1", "M").format("YYYYMM");
    dailyCovidSql = `SELECT incDec FROM covid${lastMonth} WHERE gubun='합계' and seq >= '${seqNum}' UNION SELECT incDec FROM covid${curMonth} WHERE gubun='합계' and seq >= '${seqNum}'`;
    cityCovidSql = `SELECT gubun,defCnt FROM covid${lastMonth} WHERE seq >='${seqNum}' and gubun != '합계' UNION SELECT gubun,defCnt FROM covid${curMonth} WHERE seq >='${seqNum}' and gubun != '합계'`;
  } else {
    dailyCovidSql = `SELECT incDec FROM covid${curMonth} WHERE gubun='합계' and seq >='${seqNum}'`;
    cityCovidSql = `SELECT gubun,defCnt FROM covid${curMonth} WHERE seq >='${seqNum}' and gubun != '합계'`;
  }
  dbconn.query(dailyCovidSql, (error, dailyCovidResults, fields) => {
    const dailyCovidData = dailyCovidResults;
    if (error) throw error;
    dbconn.query(cityCovidSql, (error, cityCovidResults, fields) => {
      const cityCovidData = cityCovidResults;
      if (error) throw error;
      res.render("covidStatus.html", {
        title: "WIWY",
        dailyData: funcConv.incDecConv(dailyCovidData),
        cityList: funcConv.gubunConv(cityCovidData),
        cityCount: funcConv.defCntConv(cityCovidData),
      });
    });
  });
});

router.get("/city", (req, res, next) => {
  res.render("city");
});

router.get("/confirmedMovement", (req, res, next) => {
  res.render("confirmedMovement.html");
});

module.exports = router;
