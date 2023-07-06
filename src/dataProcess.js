import axios from 'axios';
import { DataContext } from 'variables/DataContext';
import {React, useContext} from 'react';
import  { gauches, graphs } from './variables/charts';

// data obtaining

const getData = async (sensor, timeInterval) => {
  if(!timeInterval){
    timeInterval = getCurrentTimeInterval()
  }
  let responseObject = {};
  let request = {
    'timeInterval': timeInterval
  }
  let response = await axios.post('http://student.gml.cz:3333/'+sensor, request)
  responseObject[sensor] = response.data;
  return responseObject
}


const getGauchObject = async (gauchName) => {
  let interval = getCurrentTimeInterval();
  let responseObject = await getData(gauchName, interval);

  let gauch = gauches[gauchName]
  // define a lines that will get the max and min values and assign them to the gauches object
  let valueList = responseObject[gauchName].map(record=>record.value) // get list of records values
  valueList = valueList.reverse()
  let currentValue = valueList[0]
  let minValue = Math.min(...valueList)                                // min and max values of the time interval
  let maxValue = Math.max(...valueList) 
  gauch.currentValue = currentValue
  gauch.range = [minValue, maxValue]                                    // make a value range from min to max
  // to percentage range
  let percentagePositive = (currentValue-minValue)*100 / (maxValue-minValue)
  gauch.data.datasets[0].data = [percentagePositive, 100-percentagePositive]
  return gauch
}

const getGraphObject = (responseObject, graphName, granulity) => {

  let graph = graphs[graphName] // get the graph object template for the given graph name

  let valueList = responseObject[graphName].map(record=>record.value) // get list of records values
  let timeList = responseObject[graphName].map(record=>record.create_time) // get list of records values
  // ---------------------------  define a time-translation function for get the time in a string -------------------------------------
  let granulityInterval = granulity === 'hour' ? 3600 : 900

  let points = getAvgValues(timeList, valueList, granulityInterval);
  timeList = points[0]
  valueList = points[1]

  graph.data.datasets[0].data = valueList   // save the data; values
  graph.data.labels = timeList              // save the data; labels
  return graph
}

const getCurrentTimeInterval = () => { // get the time stamp range from now to 24 hours back
  // get time interval
  let nowDateObject = new Date()
  let nowDateTimestamp = nowDateObject.getTime()/1000;
  let oneDaySecondDelta = 86400;
  let interval = [nowDateTimestamp-oneDaySecondDelta, nowDateTimestamp]
  return interval
}

// data processing
const getAvgValues = (times, values, timeDelta) => {// get avg value of the group that is grouped by time delta
  let valuesNew = []
  let timesNew = []
  //interval of all time values
  let startTimestamp = times[times.length - 1]
  let stopTimestamp = times[0]
  // the inter interval that will slice the data of the valuesY array (times)
  let interTimestamp = startTimestamp - timeDelta
  // init a new array of groups of times that fits to the interval
  let timeGroups = []

  while(interTimestamp >= stopTimestamp){ // do this until you are in the end
    let timeGroup = times.filter(time=>time >= interTimestamp && time <= startTimestamp) // slice the group by the max and min time value integer
    timeGroups.push(timeGroup)  // push the group to the array of arrays of groups
    startTimestamp = interTimestamp // recount the time slices limits
    interTimestamp -= timeDelta
  }

  // define the clear avegraged data
  timeGroups.map(timeGroup=>{
    let valueGroup = timeGroup.map(time=>values[times.indexOf(time)])
    let sumGroup = ((valueGroup)=>{let sum=0;for(let i=0;i<valueGroup.length;i++){sum+=valueGroup[i]} return sum})(valueGroup)
    let lenGroup = valueGroup.length
    let avgValue = sumGroup / lenGroup
    valuesNew.push(avgValue)
    timesNew.push(timeGroup[valueGroup.length-1])
  })
  // transform the timestamps into a strings
  timesNew = timesNew.map(timestamp=>{return new Date(timestamp*1000).toLocaleString()})
  // reverse the arrays to have the currentest values right in the graph
  timesNew = timesNew.reverse()
  valuesNew = valuesNew.reverse()
  return [timesNew, valuesNew]

}

export {getGauchObject, getGraphObject, getData}

