const dbConObj = require("./db_info");
const dbconn = dbConObj.init();
let moment = require("moment");

const currentMon = moment().format("YYYYMM");
const selectAll = `SELECT * FROM covid${currentMon}`;
dbconn.query(selectAll, (error, results, fields) => {
  console.log(results);
});

dbconn.end();
