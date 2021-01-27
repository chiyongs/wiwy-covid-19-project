// page routing 할 곳
const express = require("express");
const router = express.Router();
let moment = require("moment");
const ONUL = "2021-01-27";
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
let TOTALDEFCOUNT = 7152;
const resultConv = (result) => {
  let resultList = [];
  for (let i = 0; i < result.length; i++) {
    resultList[i] = result[i].defCnt;
  }
  // console.log(resultList);
  return resultList;
};

function calculateSeq() {
  let count = moment().diff(moment(ONUL), "days") * 19;
  TOTALDEFCOUNT += count;
  return TOTALDEFCOUNT;
}

router.get("/covidStatus", (req, res, next) => {
  // covidStatus.status();
  const sql = `SELECT defCnt FROM Covid202101 WHERE gubun='합계' and seq >='${calculateSeq()}'`;
  dbconn.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.render("covidStatus.html", {
      title: "WIWY",
      totalData: resultConv(results),
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
