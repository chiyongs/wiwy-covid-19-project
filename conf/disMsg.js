var request = require("request");
const dbConObj = require("./db_info");
const logger = require("./winston");
const dbconn = dbConObj.init();
let moment = require("moment");
// let logger = require("./winston");

function getDisMsg() {
  const curDate = moment().format("YYYYMMDD");
  var url = "http://apis.data.go.kr/1741000/DisasterMsg2/getDisasterMsgList";
  var queryParams =
    "?" +
    encodeURIComponent("ServiceKey") +
    "=PPcz55RLIRHgBc%2B5Kzjvbqey%2BsWKrDNmUGNinjzzMcrOygzB%2FI8Tin7bENsGHgDV9puW%2BxpcymvgAU79Rl8S5Q%3D%3D"; /* Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("10"); /* */
  queryParams +=
    "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /* */
  queryParams +=
    "&" + encodeURIComponent("flag") + "=" + encodeURIComponent("Y"); /* */

  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (error, response, body) {
      //console.log('Status', response.statusCode);
      //console.log('Headers', JSON.stringify(response.headers));
      // console.log("Reponse received", body);
      if (error) throw error;
      let msg = JSON.parse(body);
      if (msg.DisasterMsg[0].head[2].RESULT.resultCode == "INFO-0") {
        dbconn.query(
          `SELECT MAX(sn) FROM dismsg${curDate}`,
          (error, snResults, fields) => {
            if (snResults == msg.DisasterMsg[1].row[0].md101_sn) {
              logger.info("Same sn dismsg exists");
              return;
            } else {
              // for (
              //   let i = 0;
              //   i < Object.keys(msg.DisasterMsg[1].row).length;
              //   i++
              // ) {
              var parMsg = msg.DisasterMsg[1].row[0];

              dbconn.query(
                `INSERT INTO dismsg${curDate}(sn,msg,cr_date,loc_name) values ('${parMsg.md101_sn}','${parMsg.msg}','${parMsg.create_date}','${parMsg.location_name}')`,
                (error, results, fields) => {
                  if (error) throw error;
                }
              );
              // }
              logger.info("Dismsg updated");
            }
            // }
          }
        );
        // console.log("Load disMsg complete <= disMsg.js");
        // console.log("totalCount", msg.DisasterMsg[0].head[0].totalCount);
        // getCreateDate(msg.DisasterMsg[1].row[0].create_date);
        // getLoc_name(msg.DisasterMsg[1].row[0].location_name);
        // getContent(msg.DisasterMsg[1].row[0].msg);
      } else {
        console.log("Can not load msg");
        return;
      }
    }
  );
}

// getDisMsg();

module.exports = getDisMsg;
