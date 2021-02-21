let moment = require("moment");
function calForeign() {
  let TOTALDEFCOUNT = 80330;
  const GIJOON = "2021-02-21";
  const ONUL = moment().format("YYYY-MM-DD");
  let count = moment(ONUL).diff(moment(GIJOON), "days") * 190;
  if (TOTALDEFCOUNT == 80330) {
    TOTALDEFCOUNT += count;
  }
  return TOTALDEFCOUNT;
}

module.exports = calForeign;
