const fs = require("fs");
const request = require("request");
let moment = require("moment");
var convert = require("xml-js");
const url =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"; /*URL*/

const dbConObj = require("./db_info");
const dbconn = dbConObj.init();

async function updateData(checkDate) {
  const dbMonth = moment().format("YYYYMM");
  checkDate = "20210206";
  let task1 = await readyState(checkDate);
  let task2 = await reqToAPI(task1, checkDate);

  function readyState(checkDate) {
    let queryParams =
      "?" +
      encodeURIComponent("ServiceKey") +
      "=PPcz55RLIRHgBc%2B5Kzjvbqey%2BsWKrDNmUGNinjzzMcrOygzB%2FI8Tin7bENsGHgDV9puW%2BxpcymvgAU79Rl8S5Q%3D%3D"; /* Service Key*/
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
    return queryParams;
  }
  function reqToAPI(queryParams, checkDate) {
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
        objResult = JSON.parse(stringResult);
        console.log("body :", body);
        console.log(
          "response.resultCode :",
          objResult.response.header.resultCode._text,
          checkDate
        );
        if (
          objResult.response.header.resultCode._text != "00" ||
          objResult.response.body.totalCount.text == "0"
        ) {
          console.log("Did not updated the data <= insertData.js");
        } else {
          console.log("Did update <= insertData.js");
          console.log(
            "objLength :",
            Object.keys(objResult.response.body.items.item).length
          );
          for (
            let i = 0;
            i < Object.keys(objResult.response.body.items.item).length;
            i++
          ) {
            covidSeq = objResult.response.body.items.item[i].seq._text;
            covidGubun = objResult.response.body.items.item[i].gubun._text;
            covidDefCnt = objResult.response.body.items.item[i].defCnt._text;
            covidIncDec = objResult.response.body.items.item[i].incDec._text;
            covidStdDay = objResult.response.body.items.item[i].stdDay._text;
            covidGubunCn = objResult.response.body.items.item[i].gubunCn._text;
            covidGubunEn = objResult.response.body.items.item[i].gubunEn._text;
            covidQurRate = objResult.response.body.items.item[i].qurRate._text;
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
              `INSERT INTO covid${dbMonth}(seq,gubun,defCnt,incDec,stdDay,gubunCn,gubunEn,qurRate,createDt,deathCnt,updateDt,isolIngCnt,localOccCnt,overFlowCnt,isolClearCnt) values ('${covidSeq}','${covidGubun}', '${covidDefCnt}','${covidIncDec}','${covidStdDay}','${covidGubunCn}','${covidGubunEn}','${covidQurRate}','${covidCreateDt}','${covidDeathCnt}','${covidUpdateDt}','${covidIsolIngCnt}','${covidLocalOccCnt}','${covidOverFlowCnt}','${covidIsolClearCnt}')`,
              (error, rows, fields) => {
                if (error) throw error;
                // console.log("query did work");
              }
            );
          } // for loop end
        }
      }
    );
  }
}

// updateData();

module.exports = updateData;
