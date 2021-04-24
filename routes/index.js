const express = require("express");
const router = express.Router();
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
let moment = require("moment");
const calToday = require("../conf/calToday");
const funcConv = require("../conf/funcConv");
const calForeign = require("../conf/calForeign");
const calculateSeq = require("../conf/calculateSeq");

router.get("/", (req, res, next) => {
  res.render("index.html");
  // let curMonth = moment().format("YYYYMM");
  // let curForeign = moment().format("YYYYMMDD");
  // let checkDay = moment().format("DD");
  // let foreignSeq = calForeign();
  // let seqNum = calculateSeq();
  // let dailyCovidSql = `SELECT incDec FROM covid${curMonth} WHERE gubun = '합계' and seq >= '${seqNum}'`;
  // if (checkDay <= "06") {
  //   let lastMonth = moment().subtract("1", "M").format("YYYYMM");
  //   dailyCovidSql = `SELECT incDec FROM covid${lastMonth} WHERE gubun = '합계' and seq >= '${seqNum}' UNION SELECT incDec FROM covid${curMonth} WHERE gubun='합계' and seq >= '${seqNum}'`;
  // }
  // let todaySeq = calToday();
  // let todaySelect = `SELECT * FROM covid${curMonth} WHERE gubun = '합계' and seq >= '${todaySeq}'`;
  // let citySelect = `SELECT defCnt, incDec FROM covid${curMonth} WHERE seq >= '${todaySeq}' and gubun != '합계'`;
  // let foreignSelect = `SELECT * FROM fdcovid${curForeign} WHERE seq >= '${foreignSeq}'`;
  // dbconn.query(
  //   `SELECT seq FROM covid${curMonth} WHERE seq >='${todaySeq}'`,
  //   (error, result, fields) => {
  //     if (!result[0]) {
  //       todaySelect = `SELECT * FROM covid${curMonth} WHERE gubun = '합계' and seq >= '${
  //         todaySeq - 19
  //       }' `;
  //       citySelect = `SELECT defCnt, incDec FROM covid${curMonth} WHERE seq >= '${
  //         todaySeq - 19
  //       }' and gubun != '합계'`;
  //       if (checkDay <= "06") {
  //         let lastMonth = moment().subtract("1", "M").format("YYYYMM");
  //         dailyCovidSql = `SELECT incDec FROM covid${lastMonth} WHERE gubun = '합계' and seq >='${
  //           seqNum - 19
  //         }' UNION SELECT incDec FROM covid${curMonth} WHERE gubun = '합계' and seq >= '${
  //           seqNum - 19
  //         }'`;
  //       } else {
  //         dailyCovidSql = `SELECT incDec FROM covid${curMonth} WHERE gubun = '합계' and seq >='${
  //           seqNum - 19
  //         }'`;
  //       }
  //     }
  //   }
  // );
  // console.log(foreignSeq);
  // dbconn.query(
  //   `SELECT * FROM fdcovid${curForeign} WHERE seq >='${foreignSeq}'`,
  //   (error, result, fields) => {
  //     if (!result[0]) {
  //       let lastMonth = moment().subtract("1", "d").format("YYYYMMDD");
  //       foreignSelect = `SELECT * FROM fdcovid${lastMonth} WHERE seq >= '${
  //         foreignSeq - 190
  //       }'`;
  //     }
  //   }
  // );
  // let disMsgSelect = `SELECT * FROM dismsg${curForeign} order by sn desc`;
  // let diststepSelect = `SELECT * FROM diststep`;
  // dbconn.query(dailyCovidSql, (error, dailyResults, fields) => {
  //   if (error) throw error;
  //   // console.log(funcConv.incDecConv(dailyResults));
  //   dbconn.query(todaySelect, (error, totalResults, fields) => {
  //     dbconn.query(citySelect, (error, cityResults, fields) => {
  //       dbconn.query(diststepSelect, (error, diststepResults, fields) => {
  //         dbconn.query(disMsgSelect, (error, msgResults, fields) => {
  //           console.log(disMsgSelect);
  //           dbconn.query(foreignSelect, (error, foreignResults, fields) => {
  //             res.render("index.html", {
  //               nationNm: funcConv.nationNmConv(foreignResults),
  //               natDefCnt: funcConv.natDefCntConv(foreignResults),
  //               natDeathCnt: funcConv.natDeathCntConv(foreignResults),
  //               disMsg: funcConv.msgConv(msgResults)[0],
  //               crDate: funcConv.crDateConv(msgResults)[0],
  //               locName: funcConv.locNameConv(msgResults)[0],
  //               dailyData: funcConv.incDecConv(dailyResults),
  //               cityCount: funcConv.defCntConv(cityResults),
  //               //
  //               seoulStep: funcConv.stepConv(diststepResults)[0],
  //               daejeonStep: funcConv.stepConv(diststepResults)[1],
  //               ulsanStep: funcConv.stepConv(diststepResults)[2],
  //               sejongtStep: funcConv.stepConv(diststepResults)[3],
  //               gyeonggiStep: funcConv.stepConv(diststepResults)[4],
  //               gangwonStep: funcConv.stepConv(diststepResults)[5],
  //               busanStep: funcConv.stepConv(diststepResults)[6],
  //               chungcheongbukStep: funcConv.stepConv(diststepResults)[7],
  //               chungcheongnamStep: funcConv.stepConv(diststepResults)[8],
  //               jeollabukStep: funcConv.stepConv(diststepResults)[9],
  //               jeollanamStep: funcConv.stepConv(diststepResults)[10],
  //               gyeongsangbukStep: funcConv.stepConv(diststepResults)[11],
  //               gyeongsangnamStep: funcConv.stepConv(diststepResults)[12],
  //               jejuStep: funcConv.stepConv(diststepResults)[13],
  //               daeguStep: funcConv.stepConv(diststepResults)[14],
  //               incheonStep: funcConv.stepConv(diststepResults)[15],
  //               gwangjuStep: funcConv.stepConv(diststepResults)[16],
  //               // disasterMsg: msgObj,
  //               defCnt: funcConv.defCntConv(totalResults),
  //               incDec: funcConv.incDecConv(totalResults),
  //               localOccCnt: funcConv.localOccCntConv(totalResults),
  //               overFlowCnt: funcConv.overFlowCntConv(totalResults),
  //               isolClearCnt: funcConv.isolClearCntConv(totalResults),
  //               isolIngCnt: funcConv.isolIngCntConv(totalResults),
  //               deathCnt: funcConv.deathCntConv(totalResults),
  //               /* 여기서부터 시도별 데이터입니다. Cnt는 누적확진자 수, Inc는 전일 대비입니다. */
  //               seoulCnt: funcConv.defCntConv(cityResults)[0],
  //               seoulInc: funcConv.incDecConv(cityResults)[0],
  //               busanCnt: funcConv.defCntConv(cityResults)[1],
  //               busanInc: funcConv.incDecConv(cityResults)[1],
  //               daeguCnt: funcConv.defCntConv(cityResults)[2],
  //               daeguInc: funcConv.incDecConv(cityResults)[2],
  //               incheonCnt: funcConv.defCntConv(cityResults)[3],
  //               incheonInc: funcConv.incDecConv(cityResults)[3],
  //               gwangjuCnt: funcConv.defCntConv(cityResults)[4],
  //               gwangjuInc: funcConv.incDecConv(cityResults)[4],
  //               daejeonCnt: funcConv.defCntConv(cityResults)[5],
  //               daejeonInc: funcConv.incDecConv(cityResults)[5],
  //               ulsanCnt: funcConv.defCntConv(cityResults)[6],
  //               ulsanInc: funcConv.incDecConv(cityResults)[6],
  //               sejongCnt: funcConv.defCntConv(cityResults)[7],
  //               sejongInc: funcConv.incDecConv(cityResults)[7],
  //               gyeonggiCnt: funcConv.defCntConv(cityResults)[8],
  //               gyeonggiInc: funcConv.incDecConv(cityResults)[8],
  //               gangwonCnt: funcConv.defCntConv(cityResults)[9],
  //               gangwonInc: funcConv.incDecConv(cityResults)[9],
  //               chungcheongbukCnt: funcConv.defCntConv(cityResults)[10],
  //               chungcheongbukInc: funcConv.incDecConv(cityResults)[10],
  //               chungcheongnamCnt: funcConv.defCntConv(cityResults)[11],
  //               chungcheongnamInc: funcConv.incDecConv(cityResults)[11],
  //               jeollabukCnt: funcConv.defCntConv(cityResults)[12],
  //               jeollabukInc: funcConv.incDecConv(cityResults)[12],
  //               jeollanamCnt: funcConv.defCntConv(cityResults)[13],
  //               jeollanamInc: funcConv.incDecConv(cityResults)[13],
  //               gyeongsangbukCnt: funcConv.defCntConv(cityResults)[14],
  //               gyeongsangbukInc: funcConv.incDecConv(cityResults)[14],
  //               gyeongsangnamCnt: funcConv.defCntConv(cityResults)[15],
  //               gyeongsangnamInc: funcConv.incDecConv(cityResults)[15],
  //               jejuCnt: funcConv.defCntConv(cityResults)[16],
  //               jejuInc: funcConv.incDecConv(cityResults)[16],
  //               lazarettoCnt: funcConv.defCntConv(cityResults)[17],
  //               lazarettoInc: funcConv.incDecConv(cityResults)[17],
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });
});

dbconn.close;

module.exports = router;
