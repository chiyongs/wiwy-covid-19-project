let client = require("cheerio-httpcli");
const dbConObj = require("./db_info");
const dbconn = dbConObj.init();

let getDistStep = (callback) =>
  client.fetch("http://ncov.mohw.go.kr/", {}, (err, $, res, body) => {
    let aList = $("div#main_maplayout").children("button").children("span");
    for (let i = 0; i < 34; i += 2) {
      let loc_name = $(aList[i]).text();
      let loc_step = $(aList[i + 1]).text();
      //   `INSERT INTO diststep(loc_pk,location,step) values ('${i}','${loc_name}','${loc_step}')`
      dbconn.query(
        `UPDATE diststep SET step = '${loc_step}' WHERE loc_pk = '${i}'`,
        (error, results, fields) => {
          if (error) throw error;
        }
      );
    }
  });

getDistStep();
