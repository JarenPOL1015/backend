/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
const lineConfig = {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: 'content',
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        data: [43, 48, 40, 54, 67, 73, 70],
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    /**
     * Default legends are ugly and impossible to style.
     * See examples in charts.html to add your own legends
     *  */
    legend: {
      display: false,
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Day',
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value',
        },
      },
    },
  },
}

// change this to the id of your chart element in HMTL
const lineCtx = document.getElementById('line')
window.myLine = new Chart(lineCtx, lineConfig)

countCommentsByDay = (data) => {

  // Inicializar contadores por rango de horas
  const labels = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  const counts = [0, 0, 0, 0, 0, 0, 0];

  Object.values(data).forEach(record => {
    const savedDate = record.saved;
    if (!savedDate) return;

    const date = new Date(savedDate);
    if(date.getDay() == 1){
      counts[0]++;
    }else if(date.getDay() == 2){
      counts[1]++;
    }else if(date.getDay() == 3){
      counts[2]++;
    }else if(date.getDay() == 4){
      counts[3]++;
    }else if(date.getDay() == 5){
      counts[4]++;
    }else if(date.getDay() == 6){
      counts[5]++;
    }else{
      counts[6]++;
    }
  });

  return { labels, counts };
}

updateLineChart = () => {
  fetch('/api/v1/landing')
      .then(response => response.json())
      .then(data => {
          const { labels, counts } = countCommentsByDay(data);

          // Actualizar el gráfico
          window.myLine.data.labels = labels;
          window.myLine.data.datasets[0].data = counts;
          window.myLine.update();
      })
      .catch(error => console.error('Error:', error));
};

updateLineChart();


