import React from "react";
import { useState, useEffect } from "react";
// react plugin used to create charts
import { Line, Pie, Doughnut } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";
// core components
import {
  sensors
} from "variables/charts.js";
import DatePicker from 'variables/DatePicker/DatePicker';

const GraphCard = (props) => {
  const [currentGraph, setCurrentGraph] = useState({... props.graph});


  const get24Hours = () => { // gets the yesterday's timeStamp
    let today = new Date();
    let yesterday = new Date(today.getTime());
    yesterday.setDate(today.getDate() - 1);

    let dateYest = String(yesterday.getFullYear())+'-'+String((yesterday.getMonth()+1)).padStart(2, "0")+'-'+String(yesterday.getDate()).padStart(2, "0");
    let timeYest = String(yesterday.getHours()).padStart(2, "0") + ":" + String(yesterday.getMinutes()).padStart(2, "0") + ":" + String(yesterday.getSeconds()).padStart(2, "0");
    let timeStampYest = dateYest +';'+timeYest;

    let dateToday = String(today.getFullYear())+'-'+String((today.getMonth()+1)).padStart(2, "0")+'-'+String(today.getDate()).padStart(2, "0");
    let timeToday = String(today.getHours()).padStart(2, "0") + ":" + String(today.getMinutes()).padStart(2, "0") + ":" + String(today.getSeconds()).padStart(2, "0");
    let timeStampToday = dateToday +';'+timeToday;

    return [timeStampYest, timeStampToday];
  }
  const getLabelList = ([start, stop]) =>{ // these are the timeStamps of the time interval
    let timeIntervalList = [];
    let currentHour = new Date(stop);
    for(let i=24; i>=0;i--){
      timeIntervalList.push(currentHour.getTime());   
      // console.log(currentHour);
      currentHour.setTime(currentHour.getTime()-1*60*60*1000);
    } 
    return timeIntervalList;
  }
  const getDataList = (timeIntervalList) => {
    let timeCodes = currentGraph.data.labels.map((measure)=>{
      measure = new Date(measure);
      return measure.getTime();
    });
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
    // // MAKE AN AVERAGES OF EACH HOUR
    let dataList=[];
    choosedValuesTime.map(lis=>{
      let hourValue = 0;
      lis.map(time=>{
        if(time){
          let value = props.graph.data.datasets[0].data[timeCodes.indexOf(time)];
          hourValue+=value;
        }
      })
      let avg = hourValue / lis.length;
      dataList.push([avg]);
      
    })
    return dataList;
  }
  const croppGraphData = (timeIntervalList, dataList) => {
    timeIntervalList = timeIntervalList.slice(0, timeIntervalList.length-1);
    console.log(timeIntervalList, dataList);
    setCurrentGraph(prev=>{
      prev.data.datasets[0].data = dataList.map(hour=>{return hour[0]});
      let clearedLabels = timeIntervalList.map(intDate=>{
        let date = new Date(intDate);
        return date.getHours();
      })
      prev.data.labels = clearedLabels.map(label=>label);
      // console.log(clearedLabels);
      return prev;
    })
  }

  useEffect(() => {
    const [start, stop] = get24Hours();
    let timeIntervalList = getLabelList([start, stop]);
    let dataList = getDataList(timeIntervalList);
    croppGraphData(timeIntervalList, dataList);
  }, []);

  const pickerHandler = (e) => {
    console.log('pressed');
  }
  console.log(currentGraph);
  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">{props.graph.name}</CardTitle>
            <p className="card-category">24 Hours performance</p>
          </CardHeader>
          <CardBody>
            <Line
              data={currentGraph.data}
              options={currentGraph.options}
              width={2}
              height={1}
            />
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
              {/* <i className="fa fa-history" /> Updated 3 minutes ago */}
              {(props.graphRange ==='multi')
                ? <DatePicker onChange={pickerHandler}/>
                : null
              }
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
}

export default GraphCard;
