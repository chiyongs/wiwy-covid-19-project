var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var convert = require("xml-js");
const url =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"; /*URL*/

const year = new Date().getFullYear();
const month = new Date().getMonth();
const date = new Date().getDate();
const PDATE = `${year}${month + 1 < 10 ? `0${month + 1}` : month}${date}`;

const PASSWORD = "root1234";
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: PASSWORD,
  database: "WiwyCovid",
});

let xml = "";
let queryParams =
  "?" +
  encodeURIComponent("ServiceKey") +
  "=" +
  "PPcz55RLIRHgBc%2B5Kzjvbqey%2BsWKrDNmUGNinjzzMcrOygzB%2FI8Tin7bENsGHgDV9puW%2BxpcymvgAU79Rl8S5Q%3D%3D"; /*Service Key*/
queryParams +=
  "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
queryParams +=
  "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /**/
queryParams +=
  "&" +
  encodeURIComponent("startCreateDt") +
  "=" +
  encodeURIComponent("20210121"); /**/
queryParams +=
  "&" +
  encodeURIComponent("endCreateDt") +
  "=" +
  encodeURIComponent("20210127"); /**/
xhr.open("GET", url + queryParams);
xhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    xml = this.responseText;
    const stringResult = convert.xml2json(xml, { compact: true, spaces: 2 });
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
      covidIsolIngCnt = objResult.response.body.items.item[i].isolIngCnt._text;
      covidLocalOccCnt =
        objResult.response.body.items.item[i].localOccCnt._text;
      covidOverFlowCnt =
        objResult.response.body.items.item[i].overFlowCnt._text;
      covidIsolClearCnt =
        objResult.response.body.items.item[i].isolClearCnt._text;
      // INSERT QUERY
      connection.query(
        `INSERT INTO Covid202101(seq,gubun,defCnt,incDec,stdDay,gubunCn,gubunEn,qurRate,createDt,deathCnt,updateDt,isolIngCnt,localOccCnt,overFlowCnt,isolClearCnt)
           values ('${covidSeq}','${covidGubun}', '${covidDefCnt}','${covidIncDec}','${covidStdDay}','${covidGubunCn}','${covidGubunEn}','${covidQurRate}','${covidCreateDt}','${covidDeathCnt}','${covidUpdateDt}','${covidIsolIngCnt}','${covidLocalOccCnt}','${covidOverFlowCnt}','${covidIsolClearCnt}')`,
        (error, rows, fields) => {
          if (error) throw error;
          //   console.log("query did work");
        }
      );
    } // for loop end
  }
};
// SELECT QUERY
// connection.query(
// `SELECT defCnt FROM Covid202010 WHERE gubun='서울' AND defCnt = '7900'`,
// `SELECT JSON_EXTRACT(covidData, '$.stdDay._text'), JSON_EXTRACT(covidData,'$.defCnt._text') FROM Covid202101 WHERE JSON_EXTRACT(covidData, '$.gubun._text') = '서울'`,
// `SELECT JSON_EXTRACT(covidData,'$.defCnt._text') FROM Covid202101 WHERE JSON_EXTRACT(covidData, '$.gubun._text') = '서울'`,
//   `SELECT JSON_EXTRACT(covidData, '$.gubun._text') FROM Covid202101 WHERE JSON_EXTRACT(covidData, '$.gubun._text') = '서울'`,
// (error, rows, fields) => {
// if (error) throw error;
// console.log(`Data is :`, JSON.stringify(rows));
// console.log(typeof rows.defCnt);
//   }
// );
// connection.end();

xhr.send("");
