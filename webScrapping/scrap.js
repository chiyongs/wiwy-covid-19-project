const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
    
    let url = 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=14&ncvContSeq=&contSeq=&board_id=&gubun=';
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2'});

    let data = await page.evaluate(() => {

        let title = document.querySelector('#content > div > div:nth-child(7) > table > tbody > tr:nth-child(3) > td:nth-child(3)').innerText;
        
        return {
            title
        }
    });

    console.log(data);

    debugger;

    await browser.close();

})();

// (async() => {
//     const browser = await puppeteer.launch ({ headless: false });
//     const page = await browser.newPage();
//     await page.goto("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=14&ncvContSeq=&contSeq=&board_id=&gubun=");
//     const content  = await page.content();
//     const $ = cheerio.load(content);
//     const lists = $("#content > div > div.data_table.mgt16.tbl_scrl_mini2.mini > table");
//     lists.each((index, list) => {
//         const name = $(list).find("#content > div > div.data_table.mgt16.tbl_scrl_mini2.mini > table > tbody > tr:nth-child(1) > th").text();
//         console.log({
//             index, name
//         });
//     });
    
//     browser.close();
// })();

// async function main(){
//     let browser = await puppeteer.launch({ headless: false });
//     let page = await browser.newPage();
//     await page.goto("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=14&ncvContSeq=&contSeq=&board_id=&gubun=");
//     // let eh = await page.$("div.data_table.mgt16");
//     // eh.$eval('')
// }

// main();