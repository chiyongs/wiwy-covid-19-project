const getDisMsg = require("./disMsg");
const updateData = require("./updateData");

let key = updateData("20210212", (key) => {
  console.log(key);
});

// getDisMsg(
//   function (date) {
//     console.log(date);
//   },
//   function (loc) {
//     console.log(loc);
//   },
//   function (con) {
//     console.log(con);
//   }
// );
