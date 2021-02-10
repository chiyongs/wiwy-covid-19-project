let client = require("cheerio-httpcli");

// 검색어
var word = "apple"; //이 검색부분을 getElementby를 써서 검색창에 입력되는 값을 가져온다.

let printHttpResponse = () =>
  client.fetch(
    "http://www.google.com/search",
    { q: word },
    (err, $, res, body) => {
      // console.log(body); -> 제대로 출력이 되는지 확인하기 위해서 작성
      //div yuRUbf의 클래스 안에있는 것들 서치
      let aList = $("div.yuRUbf").children("a");
      let happy = aList.children("h3");
      let subList = $("div.IsZvec").children("div").children("span");
      for (let i = 0; i < aList.length; i++) {
        // console.log($(aList[i]).text()); //yuRUbf안에 있는 텍스트 출력
        console.log($(happy[i]).text());
        console.log($(aList[i]).attr("href")); //링크 출력
      }
      for (let i = 0; i < subList.length; i++) {
        console.log($(subList[i]).text());
      }
    }
  );

printHttpResponse();
