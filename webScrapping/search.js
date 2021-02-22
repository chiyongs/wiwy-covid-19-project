const puppeteer = require("puppeteer");

(async () => {
  // headless 브라우저 실행
  const browser = await puppeteer.launch();
  // 새로운 페이지 열기
  const page = await browser.newPage();
  // `https://ko.reactjs.org/` URL에 접속
  await page.goto("https://www.google.com/search?q=apple/");
  // `ko-reactjs-homepage.png` 스크린샷을 캡처 하여 Docs 폴더에 저장

  /****************
   * 원하는 작업 수행 *
   *
   ****************/
  let data = await page.$eval(
    "#bzMwOe > div > div > div > div:nth-child(1) > a:nth-child(1)",

    (element) => {
      return element.textContent;
    }
  );

  console.log(data);

  // console.log((abc = reactHistory));
  // 모든 스크래핑 작업을 마치고 브라우저 닫기
  await browser.close();
})();
