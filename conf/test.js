const getDisMsg = require("./disMsg");

getDisMsg(
  function (date) {
    console.log(date);
  },
  function (loc) {
    console.log(loc);
  },
  function (con) {
    console.log(con);
  }
);
