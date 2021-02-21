let client = require("cheerio-httpcli");

// 검색어
var word = "apple"; //이 검색부분을 getElementby를 써서 검색창에 입력되는 값을 가져온다.

let printHttpResponse = () =>
  client.fetch(
    "http://www.google.com/search",
    { q: word },
    (err, $, res, body) => {
      // console.log(body);
      //div yuRUbf의 클래스 안에있는 것들 서치
      if (err) throw err;
      // console.log($);
      let happy = $("div.dZtbP");
      let melody = $("div.dZtbP").find("a.k8XOCe");

      // .children("div.s75CSd");

      // let subList = $("div.IsZvec").children("div").children("span");
      // for (let i = 0; i < happy.length; i++) {
      // console.log($(aList[i]).text()); //yuRUbf안에 있는 텍스트 출력
      // console.log($(aList[i])); //링크 출력
      // console.log($(happy[i]).text());
      // }
      for (let i = 0; i < melody.length; i++) {
        console.log($(melody[i]).text());
      }
    }
  );

printHttpResponse();
