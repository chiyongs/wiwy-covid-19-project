const express = require("express");
const router = express.Router();
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
let moment = require("moment");
// const calculateSeq = require("../conf/calculateSeq");
const calToday = require("../conf/calToday");
const funcConv = require("../conf/funcConv");

/* GET home page. */
router.get("/", (req, res, next) => {
  let today = moment().format("YYYYMM");
  // const seqNum = calculateSeq();
  const todaySeq = calToday();
  const todaySelect = `SELECT * FROM covid${today} WHERE gubun = '합계' and seq >= '${todaySeq}'`;
  const citySelect = `SELECT defCnt, incDec FROM covid${today} WHERE seq >= '${todaySeq}' and gubun != '합계'`;
  dbconn.query(todaySelect, (error, totalResults, fields) => {
    dbconn.query(citySelect, (error, cityResults, fields) => {
      // console.log("total:", totalResults);
      // console.log("city:", cityResults);
      res.render("index.html", {
        defCnt: funcConv.defCntConv(totalResults),
        incDec: funcConv.incDecConv(totalResults),
        localOccCnt: funcConv.localOccCntConv(totalResults),
        overFlowCnt: funcConv.overFlowCntConv(totalResults),
        isolClearCnt: funcConv.isolClearCntConv(totalResults),
        isolIngCnt: funcConv.isolIngCntConv(totalResults),
        deathCnt: funcConv.deathCntConv(totalResults),
        /* 여기서부터 시도별 데이터입니다. Cnt는 누적확진자 수, Inc는 전일 대비입니다. */
        seoulCnt: funcConv.defCntConv(cityResults),
        seoulInc: funcConv.incDecConv(cityResults),
        gyeonggiCnt: funcConv.defCntConv(cityResults),
        gyeonggiInc: funcConv.incDecConv(cityResults),
        busanCnt: funcConv.defCntConv(cityResults),
        busanInc: funcConv.incDecConv(cityResults),
        daeguCnt: funcConv.defCntConv(cityResults),
        daeguInc: funcConv.incDecConv(cityResults),
        incheonCnt: funcConv.defCntConv(cityResults),
        incheonInc: funcConv.incDecConv(cityResults),
        gwangjuCnt: funcConv.defCntConv(cityResults),
        gwangjuInc: funcConv.incDecConv(cityResults),
        daejeonCnt: funcConv.defCntConv(cityResults),
        daejeonInc: funcConv.incDecConv(cityResults),
        ulsanCnt: funcConv.defCntConv(cityResults),
        ulsanInc: funcConv.incDecConv(cityResults),
        sejongCnt: funcConv.defCntConv(cityResults),
        sejongInc: funcConv.incDecConv(cityResults),
        gangwonCnt: funcConv.defCntConv(cityResults),
        gangwonInc: funcConv.incDecConv(cityResults),
        chungcheongbukCnt: funcConv.defCntConv(cityResults),
        chungcheongbukInc: funcConv.incDecConv(cityResults),
        chungcheongnamCnt: funcConv.defCntConv(cityResults),
        chungcheongnamInc: funcConv.incDecConv(cityResults),
        jeollabukCnt: funcConv.defCntConv(cityResults),
        jeollabukInc: funcConv.incDecConv(cityResults),
        jeollanamCnt: funcConv.defCntConv(cityResults),
        jeollanamInc: funcConv.incDecConv(cityResults),
        gyeongsangbukCnt: funcConv.defCntConv(cityResults),
        gyeongsangbukInc: funcConv.incDecConv(cityResults),
        gyeongsangnamCnt: funcConv.defCntConv(cityResults),
        gyeongsangnamInc: funcConv.incDecConv(cityResults),
        jejuCnt: funcConv.defCntConv(cityResults),
        jejuInc: funcConv.incDecConv(cityResults),
        lazarettoCnt: funcConv.defCntConv(cityResults),
        lazarettoInc: funcConv.incDecConv(cityResults),
      });
    });
  });
  // res.render("index.html", { title: "WIWY" });
});

module.exports = router;
