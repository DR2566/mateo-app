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
  Button,
  ButtonGroup,
  Dropdown
} from "reactstrap";
// core components
import {
  sensors
} from "variables/charts.js";
import DatePicker from 'variables/DatePicker/DatePicker';

const GraphCard = (props) => {
  const [selectedTimeInterval, setSelectedTimeInterval] = useState([])
  const [currentGraph, setCurrentGraph] = useState({... props.graph});
  const [dataStep, setDataStep] = useState('hour');

  const changeDataStepHandler = (step) => {
    setDataStep(prev=>step);
  }

  const dataStepsOptions = {
    twoHours: 0.5,
    hour: 1,
    quarter: 4,
  }

  const timeCodes = props.graph.data.labels.map((measure)=>{ //these codes won't be changed
    measure = new Date(measure);
    return measure.getTime();
  });

  const eraseData = () => {
    setSelectedTimeInterval([get24Hours()[0],get24Hours()[1]]);
  }

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

    let startTime = new Date(start);
    let stopTime = new Date(stop);
    let timeDifference = Math.floor((stopTime-startTime)/(1000*3600))*dataStepsOptions[dataStep];

    for(let i=timeDifference; i>=0;i--){
      timeIntervalList.push(stopTime.getTime());   
      stopTime.setTime(stopTime.getTime()-1*60*60*(1000/dataStepsOptions[dataStep]));
    } 
    return timeIntervalList;
  }
  const getDataList = (timeIntervalList) => {
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
    timeIntervalList = timeIntervalList.slice(0, timeIntervalList.length-1).reverse();
    dataList = dataList.reverse();
    let clearedLabels = timeIntervalList.map(intDate=>{
      let date = new Date(intDate);
      let hour = String(date.getHours());
      let day = String(date.getDate());
      let month = String(date.getMonth()+1);
      return day +'.'+ month +'; '+ hour;
    });
    clearedLabels = clearedLabels.map(label=>label);
    let data = dataList.map(hour=>{return hour[0]});
    setCurrentGraph(prev=>{
      return {
        ...prev,
        data: {
          labels: clearedLabels,
          datasets: [
            {
              ...prev.data.datasets[0],
              data: data,
              borderColor: 'orange',
              backgroundColor: "orange",
            }
          ]
        },
      }
    });
  }
  const changeDataGraph = () => {
    let timeIntervalList = getLabelList([selectedTimeInterval[0], selectedTimeInterval[1]]);
    let dataList = getDataList(timeIntervalList);    
    croppGraphData(timeIntervalList, dataList);
  }

  useEffect(()=>{
    changeDataGraph();
  }, [selectedTimeInterval, dataStep]);

  useEffect(() => {
    const [start, stop] = get24Hours();
    setSelectedTimeInterval([start, stop]);
  }, []);

  const pickerHandler = (e) => {
    if(e.length === 2){
      setSelectedTimeInterval(prev=>[e[0], e[1]]);
    }
  }
  console.log(currentGraph);
  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">{props.graph.name}</CardTitle>
            <p className="card-category">{props.graphRange}</p>
            <div style={{textAlign: 'center'}}>
              <ButtonGroup>
                <Button onClick={()=>changeDataStepHandler('hour')}>Hourly</Button>
                <Button onClick={()=>changeDataStepHandler('quarter')}>1/4 Hour</Button>
              </ButtonGroup>
            </div>
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
              {(props.graphRange !=='24hours')
                ? <DatePicker onErase={eraseData} onChange={pickerHandler}/>
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
