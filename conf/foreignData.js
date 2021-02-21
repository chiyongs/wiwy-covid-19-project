const request = require("request");
let moment = require("moment");
var convert = require("xml-js");
const dbConObj = require("./db_info");
const logger = require("./winston");
const dbconn = dbConObj.init();

function foreignData(checkDate, callback) {
  const dbMonth = moment().format("YYYYMMDD");
  var url =
    "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson";
  var queryParams =
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
      if (objResult.response.header.resultCode._text != "00") {
        console.log("Error updated the data <= foreignData.js");
        callback(3);
      } else if (objResult.response.body.totalCount._text == "0") {
        console.log("Do not have recent data to update <= foreignData.js");
        logger.info("Foreign Night");
        callback(2);
      } else {
        console.log("Did update <= foreignData.js");
        logger.info("Foreign Data complete");
        for (
          let i = 0;
          i < Object.keys(objResult.response.body.items.item).length;
          i++
        ) {
          fDseq = objResult.response.body.items.item[i].seq._text;
          fDnationNm = objResult.response.body.items.item[i].nationNm._text;
          fDnatDeathCnt =
            objResult.response.body.items.item[i].natDeathCnt._text;
          fDnatDefCnt = objResult.response.body.items.item[i].natDefCnt._text;

          dbconn.query(
            `INSERT INTO fdcovid${dbMonth}(seq,nationNm,natDefCnt,natDeathCnt) values ('${fDseq}','${fDnationNm}','${fDnatDefCnt}','${fDnatDeathCnt}')`,
            (error, results, fields) => {
              if (error) throw error;
            }
          );
        }
        callback(1);
      }
    }
  );
}

// foreignData("20210221", () => {});

module.exports = foreignData;
