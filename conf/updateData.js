const fs = require("fs");
const request = require("request");
let moment = require("moment");
var convert = require("xml-js");

const url =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"; /*URL*/

const dbConObj = require("./db_info");
const logger = require("./winston");
const dbconn = dbConObj.init();

function updateData(checkDate, callback) {
  const dbMonth = moment().format("YYYYMM");
  let queryParams =
    "?" +
    encodeURIComponent("ServiceKey") +
    "=PgdnR4cgw6WwmfyR7rqzzBcJPu3rx3LPtinOu4hHP5B9o2oiJ6alrNDnOvcqdBmUQKgQxFW1WGDnEMPFh%2B87Zw%3D%3D"; /* Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("10"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("startCreateDt") +
    "=" +
    encodeURIComponent(checkDate); /* */
  queryParams +=
    "&" +
    encodeURIComponent("endCreateDt") +
    "=" +
    encodeURIComponent(checkDate); /* */

  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (error, response, body) {
      if (error) throw error;
      const stringResult = convert.xml2json(body, {
        compact: true,
        spaces: 2,
      });
      let objResult = JSON.parse(stringResult);
      console.log(
        "response.resultCode :",
        objResult.response.header.resultCode._text,
        checkDate
      );
      if (objResult.response.header.resultCode._text != "00") {
        console.log("Error updated the data <= insertData.js");
        callback(3);
      } else if (objResult.response.body.totalCount._text == "0") {
        console.log("Do not have recent data to update <= insertData.js");
        logger.info("Night");
        callback(2);
      } else {
        dbconn.query(
          `SELECT MAX(defCnt) FROM covid${dbMonth}`,
          (err, res, fields) => {
            if (res <= objResult.response.body.items.item[0].defCnt) {
              console.log("Did update <= insertData.js");
              logger.info("Updating Data Complete");
              for (
                let i = 0;
                i < Object.keys(objResult.response.body.items.item).length;
                i++
              ) {
                covidSeq = objResult.response.body.items.item[i].seq._text;
                covidGubun = objResult.response.body.items.item[i].gubun._text;
                covidDefCnt =
                  objResult.response.body.items.item[i].defCnt._text;
                covidIncDec =
                  objResult.response.body.items.item[i].incDec._text;
                covidStdDay =
                  objResult.response.body.items.item[i].stdDay._text;
                covidGubunCn =
                  objResult.response.body.items.item[i].gubunCn._text;
                covidGubunEn =
                  objResult.response.body.items.item[i].gubunEn._text;
                covidQurRate =
                  objResult.response.body.items.item[i].qurRate._text;
                covidCreateDt =
                  objResult.response.body.items.item[i].createDt._text;
                covidDeathCnt =
                  objResult.response.body.items.item[i].deathCnt._text;
                covidUpdateDt =
                  objResult.response.body.items.item[i].updateDt._text;
                covidIsolIngCnt =
                  objResult.response.body.items.item[i].isolIngCnt._text;
                covidLocalOccCnt =
                  objResult.response.body.items.item[i].localOccCnt._text;
                covidOverFlowCnt =
                  objResult.response.body.items.item[i].overFlowCnt._text;
                covidIsolClearCnt =
                  objResult.response.body.items.item[i].isolClearCnt._text;
                // INSERT QUERY
                // console.log(objResult.response.body.items.item[i]);

                dbconn.query(
                  // `UPDATE covid${dbMonth} SET gubun = '${covidGubun}', defCnt = '${covidDefCnt}', incDec = '${covidIncDec}', stdDay = '${covidStdDay}', gubunCn = '${covidGubunCn}', gubunEn = '${covidGubunEn}', qurRate = '${covidQurRate}', createDt='${covidCreateDt}', deathCnt='${covidDeathCnt}', updateDt='${covidUpdateDt}', isolIngCnt='${covidIsolIngCnt}', localOccCnt='${covidLocalOccCnt}', overFlowCnt='${covidOverFlowCnt}', isolClearCnt='${covidIsolClearCnt}' WHERE seq = '${covidSeq}'`,
                  `INSERT INTO covid${dbMonth}(seq,gubun,defCnt,incDec,stdDay,gubunCn,gubunEn,qurRate,createDt,deathCnt,updateDt,isolIngCnt,localOccCnt,overFlowCnt,isolClearCnt) values ('${covidSeq}','${covidGubun}', '${covidDefCnt}','${covidIncDec}','${covidStdDay}','${covidGubunCn}','${covidGubunEn}','${covidQurRate}','${covidCreateDt}','${covidDeathCnt}','${covidUpdateDt}','${covidIsolIngCnt}','${covidLocalOccCnt}','${covidOverFlowCnt}','${covidIsolClearCnt}')`,
                  (error, rows, fields) => {
                    if (error) throw error;
                    // console.log("query did work");
                  }
                );
              } // for loop end
              callback(1);
            } else {
              logger.info("Invalid recent data");
              return;
            }
          }
        );
      }
    }
  );
}

// updateData("20210301", () => {});

module.exports = updateData;
