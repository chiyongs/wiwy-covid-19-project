const cityCovidCtx = document.getElementById("cityCovidChart").getContext("2d");
const cityDnCtx = document.getElementById("citiCovidDn").getContext("2d");

const inpCity = document.getElementById("js-cityCovid");

const cities = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

function renderDoughnut() {
  const splitCityData = inpCity.value.split(",");
  let sortedCityData = [];
  for (let i = 0; i < splitCityData.length; i++) {
    let intSplitResult = parseInt(splitCityData[i]);
    sortedCityData.push(intSplitResult);
  }
  sortedCityData.sort((a, b) => {
    return b - a;
  });
  let refinedList = [];
  let temp = 0;
  for (let i = 0; i < sortedCityData.length; i++) {
    if (i < 5) {
      refinedList.push(sortedCityData[i]);
    } else {
      temp = temp + sortedCityData[i];
    }
  }
  refinedList.push(temp);
  console.log(refinedList);
  var myChart = new Chart(cityDnCtx, {
    type: "doughnut",
    data: {
      labels: ["서울", "경기", "대구", "인천", "부산", "기타"],
      datasets: [
        {
          label: "도시별 확진자",
          data: refinedList,
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
  });
}
function renderChart() {
  const splitCityData = inpCity.value.split(",");
  var myChart = new Chart(cityCovidCtx, {
    type: "bar",
    data: {
      labels: cities,
      datasets: [
        {
          label: "도시별 확진자",
          data: splitCityData,
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
  renderDoughnut();
}

init();
