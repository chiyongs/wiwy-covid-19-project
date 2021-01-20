// page routing 할 곳
const express = require("express");
const router = express.Router();
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
const resultConv = (result) => {
  console.log(typeof result);
  let resultList = [];
  for (let i = 0; i < result.length; i++) {
    resultList[i] = result[i].defCnt;
  }
  return resultList;
};

router.get("/covidStatus", (req, res, next) => {
  // covidStatus.status();
  const sql = `SELECT defCnt FROM Covid202010 WHERE gubun='서울'`;
  dbconn.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.render("covidStatus", {
      title: "WIWY",
      data: resultConv(results),
    });
  });
});

router.get("/city", (req, res, next) => {
  res.render("city");
});

router.get("/confirmedMovement", (req, res, next) => {
  res.render("confirmedMovement");
});

module.exports = router;
