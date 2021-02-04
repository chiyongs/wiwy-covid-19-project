let moment = require("moment");
function calculateSeq() {
  let TOTALDEFCOUNT = 7152;
  const ONUL = "2021-01-27";
  let count = moment().diff(moment(ONUL), "days") * 19;
  if (TOTALDEFCOUNT == 7152) {
    TOTALDEFCOUNT += count;
  }
  console.log("count:", TOTALDEFCOUNT);
  return TOTALDEFCOUNT;
}

module.exports = calculateSeq;
