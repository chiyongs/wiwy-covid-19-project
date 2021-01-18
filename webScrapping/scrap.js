const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const writeStream = fs.createWriteStream('Overseas inflow patient status.json');

// Write Headers
writeStream.write(`Name,Value \n`);

request('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=', (error, response, html) => {
    if (!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        // const siteHeading = $('.data_table.mgt16');
        // console.log(siteHeading.html());
        // console.log(siteHeading.text());
        // const output = siteHeading.find('td').text();
        // const output = siteHeading.children('td').text();
        // const output = siteHeading
        // .children('td')
        // .next()
        // .text();
        
        // const output = siteHeading
        // .children('td')
        // .parent()
        // .text();

        $('.data_table.mgt16').each((i, el) => {
            // const item = $(el)
            // .text()
            // .replace(/\s\s+/g, '');
            
            const name = $(el)
            .find('.data_table.mgt16 th')
            .text();

            const value = $(el)
            .find('.data_table.mgt16 td')
            .text();

            // console.log(name, value);
            //Write Row to csv
            writeStream.write(`${name}, ${value} \n`);
        });

        console.log('Scrapping Done');
    }
});

// (async () => {
    
//     let url = 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=14&ncvContSeq=&contSeq=&board_id=&gubun=';
//     let browser = await puppeteer.launch();
//     let page = await browser.newPage();

//     await page.goto(url, { waitUntil: 'networkidle2'});

//     let data = await page.evaluate(() => {

//         let title = document.querySelector('#content > div > div:nth-child(7)').textContent;
        
//         return {
//             title : title
//         }
//     });
//     console.log(data);

//     debugger;

//     await browser.close();

// })();

