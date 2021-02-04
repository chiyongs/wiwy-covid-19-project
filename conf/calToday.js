let moment = require("moment");
function calToday() {
  let TOTALDEFCOUNT = 7152;
  const GIJOON = "2021-01-21";
  const ONUL = moment().format("YYYY-MM-DD");
  let count = moment(ONUL).diff(moment(GIJOON), "days") * 19;
  if (TOTALDEFCOUNT == 7152) {
    TOTALDEFCOUNT += count;
  }
  return TOTALDEFCOUNT;
}

module.exports = calToday;
