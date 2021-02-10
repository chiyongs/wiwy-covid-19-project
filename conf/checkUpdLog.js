const fs = require("fs");
let moment = require("moment");
const updateData = require("./updateData");
let logger = require("./winston");

function checkUpdate(callback) {
  for (let i = 7; i >= 0; i--) {
    let checkDate = moment().subtract(i, "days").format("YYYY-MM-DD");
    let exists = fs.statSync(`./logs/update/${checkDate}.log`);
    if (exists) {
      fs.readFile(`./logs/update/${checkDate}.log`, "utf8", (err, data) => {
        let updatedAlready = data.indexOf("Updating");
        let nightExists = data.indexOf("Night");
        if (updatedAlready == -1 && nightExists == -1) {
          let formedDate = moment().subtract(i, "days").format("YYYYMMDD");
          //update 안 됨
          const updKey = updateData(formedDate);
          console.log("updKey:", updKey);
          if (updKey == 1) {
            // update complete
            console.log("Did update");
            if (i == 0) {
              callback(updKey);
            }
          } else if (updKey == 2) {
            // 밤 동안 최신 데이터가 없어서 업데이트 불가능
            console.log("No recent data <= checkUpdLog.js");
            if (i == 0) {
              callback(updKey);
            }
          } else {
            // 그냥 업데이트 실패 데이터불러올때 에러코드
            if (i == 0) {
              callback(updKey);
            }
          }
        } else if (nightExists != -1 && updatedAlready == -1) {
          console.log("It is night");
          if (i == 0) {
            callback(2);
          }
        } else {
          console.log(`${checkDate} is already updated!`);
          if (i == 0) {
            callback(1);
          }
        }
      });
    } else {
      console.log(`file or directory does not exist`);
    }
  }
}
module.exports = checkUpdate;
