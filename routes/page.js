// page routing 할 곳
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var convert = require("xml-js");
const url =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"; /*URL*/
const updateData = require("../conf/insertData");
const express = require("express");
const router = express.Router();
const fs = require("fs");
let logger = require("../conf/winston");
let moment = require("moment");
const ONUL = "2021-01-27";
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
let TOTALDEFCOUNT = 7152;
const checkUpdate = require("../conf/checkUpdLog");

const incDecConv = (result) => {
  let resultList = [];
  for (let i = 0; i < result.length; i++) {
    resultList[i] = result[i].incDec;
  }
  return resultList;
};
const defCntConv = (result) => {
  let resultList = [];
  for (let i = 0; i < result.length; i++) {
    resultList[i] = result[i].defCnt;
  }
  return resultList;
};
const gubunConv = (result) => {
  let resultList = [];
  for (let i = 0; i < result.length; i++) {
    resultList[i] = result[i].gubun;
  }
  return resultList;
};

function calculateSeq() {
  let count = moment().diff(moment(ONUL), "days") * 19;
  if (TOTALDEFCOUNT == 7152) {
    TOTALDEFCOUNT += count;
  }
  return TOTALDEFCOUNT;
}

router.get("/main", (req, res, next) => {
  res.render("main", {
    title: "WIWY",
  });
});

router.get("/covidStatus", (req, res, next) => {
  checkUpdate();
  const seqNum = calculateSeq();
  const dailyCovidSql = `SELECT incDec FROM Covid202101 WHERE gubun='합계' and seq >='${seqNum}'`;
  const cityCovidSql = `SELECT gubun,defCnt FROM Covid202101 WHERE seq >='${seqNum}' and gubun != '합계'`;
  dbconn.query(dailyCovidSql, (error, dailyCovidResults, fields) => {
    const dailyCovidData = dailyCovidResults;
    if (error) throw error;
    dbconn.query(cityCovidSql, (error, cityCovidResults, fields) => {
      const cityCovidData = cityCovidResults;
      if (error) throw error;
      res.render("covidStatus.html", {
        title: "WIWY",
        dailyData: incDecConv(dailyCovidData),
        cityList: gubunConv(cityCovidData),
        cityCount: defCntConv(cityCovidData),
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
