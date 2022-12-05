class Process {
  constructor(){
    this.dataStepsOptions = {
      twoHours: 0.5,
      hour: 1,
      quarter: 4,
    }    
  }
  getPastTime = (daysBack) => { // gets the yesterday's timeStamp
    let today = new Date();
    let yesterday = new Date(today.getTime());
    yesterday.setDate(today.getDate() - daysBack);

    let dateYest = String(yesterday.getFullYear())+'-'+String((yesterday.getMonth()+1)).padStart(2, "0")+'-'+String(yesterday.getDate()).padStart(2, "0");
    let timeYest = String(yesterday.getHours()).padStart(2, "0") + ":" + String(yesterday.getMinutes()).padStart(2, "0") + ":" + String(yesterday.getSeconds()).padStart(2, "0");
    let timeStampYest = dateYest +';'+timeYest;

    let dateToday = String(today.getFullYear())+'-'+String((today.getMonth()+1)).padStart(2, "0")+'-'+String(today.getDate()).padStart(2, "0");
    let timeToday = String(today.getHours()).padStart(2, "0") + ":" + String(today.getMinutes()).padStart(2, "0") + ":" + String(today.getSeconds()).padStart(2, "0");
    let timeStampToday = dateToday +';'+timeToday;

    return [timeStampYest, timeStampToday];
  }
  getTimeStamps = (labels) => {
    // console.log(labels);
    const timeCodes = labels.map((measure)=>{ //these codes won't be changed
      measure = new Date(measure);
      return measure.getTime();
    });  
    return timeCodes;
  }
  getLabelList = (backTime,dataStep) =>{ // these are the timeStamps of the time interval
    let timeIntervalList = [];
    let start;
    let stop;

    if(typeof backTime === 'number'){ //there can be how much days back, or exact timestamp => it is number or string; if number==>days => call getPastTime(); or it is a string=> exact start stop timeStamps
      [start, stop] = this.getPastTime(backTime);
    } else{
      [start, stop] = backTime;
    }
    let startTime = new Date(start);
    let stopTime = new Date(stop);
    let timeDifference = Math.floor((stopTime-startTime)/(1000*3600))*this.dataStepsOptions[dataStep];

    for(let i=timeDifference; i>=0;i--){
      timeIntervalList.push(stopTime.getTime());   
      stopTime.setTime(stopTime.getTime()-1*60*60*(1000/this.dataStepsOptions[dataStep]));
    } 
    return timeIntervalList;
  }
  getDataList = (timeIntervalList, graphOriginal) => {
    // console.log(graphOriginal);
    let timeCodes = this.getTimeStamps(graphOriginal.data.labels);
    let choosedValuesTime = [];
    for(let i=0;i<timeIntervalList.length-1;i++){
      let start = timeIntervalList[i+1];
      let stop = timeIntervalList[i];
      choosedValuesTime.push([])
      for(let b=0;b<timeCodes.length;b++){
        if(timeCodes[b]>=start && timeCodes[b]<=stop){
          choosedValuesTime[i].push(timeCodes[b]);
        }
      }
    }
    // MAKE AN AVERAGES OF EACH HOUR
    let dataList=[];
    choosedValuesTime.map(lis=>{
      let hourValue = 0;
      lis.map(time=>{
        if(time){
          let value = graphOriginal.data.datasets[0].data[timeCodes.indexOf(time)];
          hourValue+=value;
        }
      })
      let avg = hourValue / lis.length;
      dataList.push([avg]);
    })
    return dataList;
  }
}
const dataProcess = new Process();
export default dataProcess;