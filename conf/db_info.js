const mysql = require("mysql");
const PASSWORD = "root1234";
const dbconnInfo = {
  chiyongs: {
    host: "localhost",
    user: "root",
    password: PASSWORD,
    database: "WiwyCovid",
  },
};

const dbconnection = {
  init: function () {
    return mysql.createConnection(dbconnInfo.chiyongs);
  },

  dbopen: function (con) {
    con.connect(function (err) {
      if (err) {
        console.error("mysql connection error :" + err);
      } else {
        console.info("mysql connection successfully.");
      }
    });
  },
};

module.exports = dbconnection;
