// const { RFC_2822 } = require("moment");

const funcConv = require("./funcConv");

// const sampleJSON = {
//   body: {
//     items: {
//       item: [
//         {
//           createDt: {
//             _text: "2021-02-0209: 35: 26.009",
//           },
//           deathCnt: {
//             _text: "3",
//           },
//           defCnt: {
//             _text: "2744",
//           },
//           gubun: {
//             _text: "검역",
//           },
//           gubunCn: {
//             _text: "隔離區",
//           },
//           gubunEn: {
//             _text: "Lazaretto",
//           },
//           incDec: {
//             _text: "12",
//           },
//           isolClearCnt: {
//             _text: "2221",
//           },
//           isolIngCnt: {
//             _text: "520",
//           },
//           localOccCnt: {
//             _text: "0",
//           },
//           overFlowCnt: {
//             _text: "12",
//           },
//           qurRate: {
//             _text: "-",
//           },
//           seq: {
//             _text: "7398",
//           },
//           stdDay: {
//             _text: "2021년02월02일00시",
//           },
//           updateDt: {
//             _text: "null",
//           },
//         },
//         {
//           hello: {
//             _text: "hi",
//           },
//         },
//         {
//           buddy: {
//             _text: "budy",
//           },
//           man: {
//             _text: "man",
//           },
//         },
//       ],
//     },
//   },
// };
// const asa = sampleJSON.body;
// for (let i = 0; i < 4; i++) {
//   // console.log(i);
//   // console.log(asa);
//   console.log(i);
//   console.log("sampleLength:", Object.keys(sampleJSON).length);
//   console.log("bodyLength", Object.keys(sampleJSON.body).length);
//   console.log("itemsLength", Object.keys(sampleJSON.body.items).length);
//   console.log("itemLength", Object.keys(sampleJSON.body.items.item).length);

//   // console.log("itemlenght:", sampleJSON.body.items.item[i].length);
// }

async function tasks() {
  let task1 = await hi1();
  let task2 = await hi2(task1);
  let task3 = await hi3(task2);

  function hi1() {
    console.log("hi1");
    return "hi2";
  }
  function hi2(param) {
    console.log(param);
    return "hi3";
  }
  function hi3(param) {
    console.log(param);
  }
}

tasks();
