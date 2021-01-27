const inp = document.getElementById("js-covidData");
const ctx = document.getElementById("totalCovidChart").getContext("2d");
const date = new Date();
const firstMonth =
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6).getMonth() +
  1;
const secondMonth =
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - 5).getMonth() +
  1;
const thirdMonth =
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - 4).getMonth() +
  1;
const fourthMonth =
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3).getMonth() +
  1;
const fifthMonth =
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2).getMonth() +
  1;
const sixthMonth =
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).getMonth() +
  1;
const firstDate = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() - 6
).getDate();
const secondDate = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() - 5
).getDate();
const thirdDate = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() - 4
).getDate();
const fourthDate = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() - 3
).getDate();
const fifthDate = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() - 2
).getDate();
const sixthDate = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() - 1
).getDate();

const dateInfo = new Date().getDate();
const monthInfo = new Date().getMonth() + 1;

function checkMonth(monthTemp) {
  let checkedMonthInfo = "";
  if (monthTemp < 10) {
    checkedMonthInfo = `0${monthTemp}`;
  } else {
    checkedMonthInfo = monthTemp;
  }
  return checkedMonthInfo;
}

function renderChart() {
  const splitData = inp.value.split(",");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        `${checkMonth(firstMonth)}.${firstDate}`,
        `${checkMonth(secondMonth)}.${secondDate}`,
        `${checkMonth(thirdMonth)}.${thirdDate}`,
        `${checkMonth(fourthMonth)}.${fourthDate}`,
        `${checkMonth(fifthMonth)}.${fifthDate}`,
        `${checkMonth(sixthMonth)}.${sixthDate}`,
        `${checkMonth(monthInfo)}.${dateInfo}`,
      ],
      datasets: [
        {
          label: "대한민국 일별 확진자",
          data: splitData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
    },
  });
}

function init() {
  renderChart();
  //   console.log(JSON.stringify(covidData));
}

init();
// handleData();
