const express = require("express");
const router = express.Router();
const path = require("path");
let client = require("cheerio-httpcli");

/* GET users listing. */
router.post("/search_process", (req, res, next) => {
  const post = req.body;
  const searchTitle = post.searchTitle;
  if (searchTitle) {
    res.redirect(`/search/${searchTitle}`);
  } else {
    res.redirect("/");
  }
});

router.get("/:searchTitle", (req, res, next) => {
  const filteredTitle = path.parse(req.params.searchTitle).base;
  console.log(filteredTitle);
  let searchResult = {
    lstOfText: [],
    lstOfLink: [],
  };
  client.fetch(
    "http://www.google.com/search",
    { q: filteredTitle },
    (err, $, response, body) => {
      // console.log(body); -> 제대로 출력이 되는지 확인하기 위해서 작성
      //div yuRUbf의 클래스 안에있는 것들 서치
      let aList = $("div.yuRUbf").children("a");
      let h3List = aList.children("h3");
      for (let i = 0; i < aList.length; i++) {
        searchResult.lstOfText.push($(h3List[i]).text());
        searchResult.lstOfLink.push($(aList[i]).attr("href"));
        //   linkList[i] = $(aList[i]).attr("href");
        //   console.log($(aList[i]).text()); //yuRUbf안에 있는 텍스트 출력s
        //   console.log($(aList[i]).attr("href")); //링크 출력s\
      }
      //   return searchResult;
      //   res.send(searchResult);
      res.render("searchView", {
        searchResult: searchResult,
        keyword: filteredTitle,
      });
    }
  );
});

module.exports = router;
