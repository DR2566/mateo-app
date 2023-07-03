// import axios from 'axios';
// import dataProcess from 'dataProcess';
// import routes from 'routes';
// import ErrorSite from './ErrorSite/ErrorSite';

const sensors = ['Temperature', 'Humidity', 'Pressure', 'Uv'];

const gauches = { //these are the semi-circle graphs
  Temperature: { // current temperature 
    unit: "°C",
    range: [0, 0],
    currentValue: 0,//this value will be actualized while the refreshing process
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
    range: [0, 0],
    currentValue: 0,//this value will be actualized while the refreshing process
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
  Pressure: { // current humidity 
    unit: " hPa",
    range: [0],
    currentValue: 0,//this value will be actualized while the refreshing process
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
  Uv: { // current temperature 
    unit: "mW",
    range: [0, 0],
    currentValue: 0,//this value will be actualized while the refreshing process
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
  // uv_new: { // current temperature 
  //   unit: "mW",
  //   range: [0, 0],
  //   currentValue: 0,//this value will be actualized while the refreshing process
  //   data: {
  //     labels: ["Red"],
  //     datasets: [
  //       {
  //         data: [0, 100],
  //         backgroundColor: ["rgba(255, 99, 132, 0.2)", "#adadad"],
  //         borderColor: ["rgba(255,99,132,1)"],
  //         borderWidth: 1
  //       }
  //     ]
  //   },
  //   options: {
  //     plugins: {
  //       legend: { display: false },
  //       tooltip: { enabled: false }
  //     },
  //     maintainAspectRatio: false,
  //     circumference: 180,
  //     rotation: 270,
  //     valueLabel: {
  //       fontSize: 24,
  //       formatter: function (value, context) {
  //         // debugger;
  //         return "57" + " %";
  //         // return '< ' + Math.round(value);
  //       }
  //     }
  //   }
  // }, 
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
        //   label: sensors[1],
        //   data: [1,2,3,4,5],
        //   borderColor: 'orange',
        //   backgroundColor: "red",
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
  Pressure: { //Humidity in a graph
    name: sensors[2],
    data: {
      labels: [],
      datasets: [
        {
          label: sensors[2],
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
  Uv: { //Humidity in a graph
    name: sensors[3],
    data: {
      labels: [],
      datasets: [
        {
          label: sensors[3],
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
  // uv_new: { 
  //   name: sensors[0],
  //   data: {
  //     labels: ['hello', 'there'],
  //     datasets: [
  //       {
  //         label: sensors[0],
  //         data: [1,3],
  //         borderColor: 'orange',
  //         backgroundColor: "orange",
  //       },
  //     ]
  //   },
  //   options: {
  //     type: 'line',
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'top',
  //         },
  //         title: {
  //           display: true,
  //           text: 'Chart.js Line Chart'
  //         }
  //       }
  //     },
  //   }
  // },
}

export  { gauches, graphs, sensors } ;