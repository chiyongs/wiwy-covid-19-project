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
  let searchResult = {
    lstOfText: [],
    lstOfLink: [],
    lstOfSub: [],
    lstOfRelated: [],
  };
  client.fetch(
    "http://www.google.com/search",
    { q: filteredTitle },
    (err, $, response, body) => {
      let aList = $("div.yuRUbf").children("a");
      let h3List = aList.children("h3");
      let subList = $("div.IsZvec").children("div").children("span");
      let related = $("div.dZtbP").find("a.k8XOCe");

      for (let i = 0; i < aList.length; i++) {
        searchResult.lstOfText.push($(h3List[i]).text());
        searchResult.lstOfLink.push($(aList[i]).attr("href"));
      }
      for (let i = 0; i < subList.length; i++) {
        searchResult.lstOfSub.push($(subList[i]).text());
      }
      for (let i = 0; i < related.length; i++) {
        searchResult.lstOfRelated.push($(related[i]).text());
      }

      res.render("searchView", {
        searchResult: searchResult,
        keyword: filteredTitle,
      });
    }
  );
});

module.exports = router;
