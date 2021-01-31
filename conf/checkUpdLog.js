const fs = require("fs");
let moment = require("moment");
const updateData = require("./insertData");
const dbConObj = require("./db_info");
const dbconn = dbConObj.init();
let logger = require("./winston");

function checkUpdate() {
  for (let i = 7; i >= 0; i--) {
    let checkDate = moment().subtract(i, "days").format("YYYY-MM-DD");
    let exists = fs.statSync(`./logs/update/${checkDate}.log`);
    if (exists) {
      fs.readFile(`./logs/update/${checkDate}.log`, "utf8", (err, data) => {
        let updatedAlready = data.indexOf("Updating");
        if (updatedAlready == -1) {
          let formedDate = moment().subtract(i, "days").format("YYYYMMDD");
          //update 안 됨
          updateData(formedDate);
          logger.info("Updating Data Complete");
          console.log("Did update");
        } else {
          console.log(`${checkDate} is already updated!`);
        }
      });
    } else {
      console.log(`file or directory does not exist`);
    }
  }
}
module.exports = checkUpdate;
