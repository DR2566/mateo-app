import axios from 'axios';

export const sensors = ['Temperature', 'Humidity'];

const gauches = { //these are the semi-circle graphs
  Temperature: { // current temperature 
    unit: "°C",
    range: 42,
    data: {
      labels: ["Red"],
      datasets: [
        {
          data: [0, 100],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "#adadad"],
          borderColor: ["rgba(255,99,132,1)"],
          borderWidth: 1
        }
      ]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      maintainAspectRatio: false,
      circumference: 180,
      rotation: 270,
      valueLabel: {
        fontSize: 24,
        formatter: function (value, context) {
          // debugger;
          return "57" + " %";
          // return '< ' + Math.round(value);
        }
      }
    }
  },  
  Humidity: { // current humidity 
    unit: "%",
    range: 100,
    data: {
      labels: ["Red"],
      datasets: [
        {
          data: [0, 100],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "#adadad"],
          borderColor: ["rgba(255,99,132,1)"],
          borderWidth: 1
        }
      ]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      maintainAspectRatio: false,
      circumference: 180,
      rotation: 270,
      valueLabel: {
        fontSize: 24,
        formatter: function (value, context) {
          // debugger;
          return "57" + " %";
          // return '< ' + Math.round(value);
        }
      }
    }
  }, 
}

const graphs = {
  Temperature: { //temperature in a graph
    name: sensors[0],
    data: {
      labels: [],
      datasets: [
        {
          label: sensors[0],
          data: [],
          borderColor: 'orange',
          backgroundColor: "orange",
        }
      ]
    },
    options: {
      type: 'line',
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      },
    }
  },
  Humidity: { //Humidity in a graph
    name: sensors[1],
    data: {
      labels: [],
      datasets: [
        {
          label: sensors[1],
          data: [],
          borderColor: 'orange',
          backgroundColor: "orange",
        },
        // {
        //   label: 'Dataset 2',
        //   data: [6,8,9,10],
        //   borderColor: 'green',
        //   backgroundColor: "green",
        // }
      ]
    },
    options: {
      type: 'line',
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      },
    }
  },
  emailGraph: {
    data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }
        ]
      },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      maintainAspectRatio: false,
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2
      },
      scales: {
        y: {
          ticks: {
            display: false
          },
          grid: {
            drawBorder: false,
            display: false
          }
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: false,
            display: false
          },
          ticks: {
            display: false
          }
        }
      }
      }
  },
  NASDAQgraph: {
    data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
            fill: false,
            borderColor: "#fbc658",
            backgroundColor: "transparent",
            pointBorderColor: "#fbc658",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0.4
          },
          {
            data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
            fill: false,
            borderColor: "#51CACF",
            backgroundColor: "transparent",
            pointBorderColor: "#51CACF",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0.4
          }
        ]
      },
    options: {
      plugins: {
        legend: { display: false }
      }
      }
  }
}

const getData = (sensor) => {
  const prom = new Promise((resolve, reject)=>{
    axios.get('http://localhost:3333/'+sensor)
      .then((res)=>{
        return resolve(res.data);
      })
      .catch((err)=>{
        return reject(err);
      })
  })
  return prom;
}
const refreshDataChart = () => {
  const prom = new Promise((resolve, reject)=>{
    sensors.forEach((sensor)=>{
        getData(sensor)
          .then((data)=>{
            setCurrentValues(data, sensor);
            setLongtimeValues(data, sensor);
            if(sensors.indexOf(sensor)===sensors.length-1){
              resolve({gauches, graphs});
            }
          })
          .catch((err)=>{
            console.error(err);
            reject(err);
          });
      })
  })
  return(prom);
}

// BUG FOR LOADING HUMIDITY DATA !!!!!!!!!!!!!!
const setCurrentValues = (dataList, sensor) =>{
  let currentValue;
  let selectedGauch = gauches[sensor];
  currentValue = dataList[dataList.length-1].value; //the last measured time
  selectedGauch.data.datasets[0].data = [currentValue, 100]; // we want to have the half of the semi-circle value for the average value  => for examle 21 degrees celsius from 42 deg (range)
}
const setLongtimeValues = (dataList, sensor)=>{
  graphs[sensor].data.datasets[0].data = dataList.map((data)=>data.value);
  graphs[sensor].data.labels = dataList.map((data)=>data.create_time);
}

export { 
  refreshDataChart,
 }