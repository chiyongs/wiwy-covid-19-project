//
const request = require("request");
let moment = require("moment");
var convert = require("xml-js");
const url =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"; /*URL*/

const dbConObj = require("./db_info");
const dbconn = dbConObj.init();
function updateData(checkDate) {
  console.log("updateData :", checkDate);
  let xml = "";
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

  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (error, response, body) {
      if (error) throw error;
      xml = body;
      if (
        xml ===
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><response><header><resultCode>00</resultCode><resultMsg>NORMAL SERVICE.</resultMsg></header><body><items/><numOfRows>10</numOfRows><pageNo>1</pageNo><totalCount>0</totalCount></body></response>`
      ) {
        console.log("Did not updated :(");
      } else {
        console.log("Did update! :)");
        const stringResult = convert.xml2json(xml, {
          compact: true,
          spaces: 2,
        });
        objResult = JSON.parse(stringResult);

        for (let i = 0; i < objResult.response.body.items.item.length; i++) {
          covidSeq = objResult.response.body.items.item[i].seq._text;
          covidGubun = objResult.response.body.items.item[i].gubun._text;
          covidDefCnt = objResult.response.body.items.item[i].defCnt._text;
          covidIncDec = objResult.response.body.items.item[i].incDec._text;
          covidStdDay = objResult.response.body.items.item[i].stdDay._text;
          covidGubunCn = objResult.response.body.items.item[i].gubunCn._text;
          covidGubunEn = objResult.response.body.items.item[i].gubunEn._text;
          covidQurRate = objResult.response.body.items.item[i].qurRate._text;
          covidCreateDt = objResult.response.body.items.item[i].createDt._text;
          covidDeathCnt = objResult.response.body.items.item[i].deathCnt._text;
          covidUpdateDt = objResult.response.body.items.item[i].updateDt._text;
          covidIsolIngCnt =
            objResult.response.body.items.item[i].isolIngCnt._text;
          covidLocalOccCnt =
            objResult.response.body.items.item[i].localOccCnt._text;
          covidOverFlowCnt =
            objResult.response.body.items.item[i].overFlowCnt._text;
          covidIsolClearCnt =
            objResult.response.body.items.item[i].isolClearCnt._text;
          // INSERT QUERY
          dbconn.query(
            `INSERT INTO Covid202101(seq,gubun,defCnt,incDec,stdDay,gubunCn,gubunEn,qurRate,createDt,deathCnt,updateDt,isolIngCnt,localOccCnt,overFlowCnt,isolClearCnt)
           values ('${covidSeq}','${covidGubun}', '${covidDefCnt}','${covidIncDec}','${covidStdDay}','${covidGubunCn}','${covidGubunEn}','${covidQurRate}','${covidCreateDt}','${covidDeathCnt}','${covidUpdateDt}','${covidIsolIngCnt}','${covidLocalOccCnt}','${covidOverFlowCnt}','${covidIsolClearCnt}')`,
            (error, rows, fields) => {
              if (error) throw error;
              console.log("query did work");
            }
          );
        } // for loop end
      }
    }
  );
}

module.exports = updateData;
