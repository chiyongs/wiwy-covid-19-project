// page routing 할 곳
const express = require("express");
const router = express.Router();
let moment = require("moment");
const dbconnection = require("../conf/db_info");
const ONUL = "2021-01-27";
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
let TOTALDEFCOUNT = 7152;
const resultConv = (result) => {
  let resultList = [];
  for (let i = 0; i < result.length; i++) {
    resultList[i] = result[i].defCnt;
  }
  return resultList;
};

const cityListConv = (result) => {
  let cityList = [];
  for (let i = 0; i < result.length; i++) {
    cityList[i] = result[i].gubun;
  }
  return cityList;
};
const cityCountConv = (result) => {
  let cityCount = [];
  for (let i = 0; i < result.length; i++) {
    cityCount[i] = result[i].defCnt;
  }
  return cityCount;
};

function calculateSeq() {
  let count = moment().diff(moment(ONUL), "days") * 19;
  if (TOTALDEFCOUNT == 7152) {
    TOTALDEFCOUNT += count;
  }
  return TOTALDEFCOUNT;
}

router.get("/covidStatus", (req, res, next) => {
  const seqNum = calculateSeq();
  const totalCovidSql = `SELECT defCnt FROM Covid202101 WHERE gubun='합계' and seq >='${seqNum}'`;
  const cityCovidSql = `SELECT gubun,defCnt FROM Covid202101 WHERE seq >='${seqNum}' and gubun != '합계'`;
  dbconn.query(totalCovidSql, (error, totalCovidResults, fields) => {
    const totalCovidData = totalCovidResults;
    if (error) throw error;
    dbconn.query(cityCovidSql, (error, cityCovidResults, fields) => {
      const cityCovidData = cityCovidResults;
      if (error) throw error;
      res.render("covidStatus.html", {
        title: "WIWY",
        totalData: resultConv(totalCovidData),
        cityList: cityListConv(cityCovidData),
        cityCount: cityCountConv(cityCovidData),
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
