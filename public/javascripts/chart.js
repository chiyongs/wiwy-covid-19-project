const renderBtn = document.getElementsByClassName("renderBtn");

function renderChart() {
  const ctx = document.getElementById("myChart").getContext("2d");
  const apple = [1, 2, 3, 4, 5, 6];
  const color = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: color,
      datasets: [
        {
          label: "This week",
          data: apple,
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
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
$("renderBtn").click(() => {
  renderChart();
});
// if (renderBtn) {
//   renderBtn.addEventListener("click", renderChart);
// }
console.log("chart chart");
