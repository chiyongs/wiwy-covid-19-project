//
var request = require("request");

var url = "http://apis.data.go.kr/1741000/DisasterMsg2/getDisasterMsgList";
var queryParams =
  "?" +
  encodeURIComponent("ServiceKey") +
  "=" +
  "PPcz55RLIRHgBc%2B5Kzjvbqey%2BsWKrDNmUGNinjzzMcrOygzB%2FI8Tin7bENsGHgDV9puW%2BxpcymvgAU79Rl8S5Q%3D%3D"; /* Service Key*/
queryParams +=
  "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
queryParams +=
  "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /* */
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
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Reponse received", body);
  }
);
