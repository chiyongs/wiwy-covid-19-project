let client = require("cheerio-httpcli");
const dbConObj = require("./db_info");
const dbconn = dbConObj.init();

let getDisStep = (callback) =>
  client.fetch(
    "http://ncov.mohw.go.kr/regSocdisBoardView.do",
    {},
    (err, $, res, body) => {
      // let aList = $("div#main_maplayout").children("button").children("span");
      let steps = $("h4.rssd_title_2");
      console.log($(steps).text());
      for (let i = 0; i < 34; i += 2) {
        // console.log($(aList[i]));
        // let loc_name = $(aList[i]).text();
        // let loc_step = $(aList[i + 1]).text();
        // dbconn.query(
        // `INSERT INTO diststep(loc_pk,location,step) values ('${i}','${loc_name}','${loc_step}')`,
        // `UPDATE diststep SET step = '${loc_step}' WHERE loc_pk = '${i}'`,
        // (error, results, fields) => {
        // if (error) throw error;
        // }
        // );
        // console.log(loc_step);
      }
    }
  );

getDisStep();
