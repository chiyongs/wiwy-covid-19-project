let moment = require("moment");
function calculateSeq() {
  let TOTALDEFCOUNT = 7152;
  const GIJOON =
    "2021-01-25"; /* 2021-01-27로 하면 오늘자 데이터만 구할수 있음 */
  const ONUL = moment().format("YYYY-MM-DD");
  let count = moment(ONUL).diff(moment(GIJOON), "days") * 19;
  if (TOTALDEFCOUNT == 7152) {
    TOTALDEFCOUNT += count;
  }
  return TOTALDEFCOUNT;
}

module.exports = calculateSeq;
